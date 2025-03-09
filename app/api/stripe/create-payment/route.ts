import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/db";
import { stripeSessionPayment } from "@/db/stripe-schema";
import { v4 as uuidv4 } from "uuid";
import { StripeErrorLike } from "@/lib/types/stripe-type";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, stripeAccountId, description, userId } = body;

        if (!amount || !stripeAccountId || !description || !userId) {
            return NextResponse.json(
                {
                    status: "error",
                    error: "amount, stripeAccountId, description et userId sont requis",
                },
                { status: 400 }
            );
        }

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: description || "Paiement pour prestation",
                            },
                            unit_amount: amount * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                metadata: {
                    userId: userId,
                    freelancerStripeId: stripeAccountId,
                },
                success_url: `${process.env.BETTER_AUTH_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.BETTER_AUTH_URL}/payment-cancel?session_id={CHECKOUT_SESSION_ID}`,
                payment_intent_data: {
                    transfer_data: {
                        destination: stripeAccountId,
                    },
                },
            });

            if (!session || !session.url) {
                return NextResponse.json(
                    {
                        status: "error",
                        error: "Erreur lors de la création de la session de paiement",
                    },
                    { status: 500 }
                );
            }

            const sessionId = uuidv4();

            try {
                const dbResult = await db.insert(stripeSessionPayment).values([
                    {
                        id: sessionId,
                        userId: userId,
                        url: session.url,
                        status: "pending",
                    },
                ]);

                if (!dbResult) {
                    return NextResponse.json(
                        {
                            status: "error",
                            error: "Erreur lors de la mise à jour de la session de paiement",
                        },
                        { status: 400 }
                    );
                }

                return NextResponse.json({
                    status: "success",
                    content: {
                        paymentLink: session.url,
                        sessionId: sessionId,
                    },
                });
            } catch (dbError) {
                console.error("Erreur base de données:", dbError);

                return NextResponse.json({
                    status: "warning",
                    content: {
                        paymentLink: session.url,
                    },
                    message: "Lien créé mais non enregistré en base",
                });
            }
        } catch (stripeError: unknown) {
            const err = stripeError as StripeErrorLike;
            console.error("Erreur Stripe:", {
                type: err.type,
                code: err.code,
                message: err.message,
                docUrl: err.doc_url,
            });

            if (err.code === "secret_key_required") {
                return NextResponse.json(
                    {
                        status: "error",
                        error: "Configuration Stripe incorrecte",
                        detail: err.message,
                    },
                    { status: 500 }
                );
            }

            if (err.message?.includes("Connect")) {
                return NextResponse.json(
                    {
                        status: "error",
                        error: "Stripe Connect non activé",
                        detail: "Activez Stripe Connect dans votre tableau de bord",
                    },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                {
                    status: "error",
                    error: "Erreur Stripe",
                    detail: err.message || "Détails non disponibles",
                },
                { status: 500 }
            );
        }
    } catch (error: unknown) {
        console.error("Erreur générale:", error);
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";

        return NextResponse.json(
            {
                status: "error",
                error: "Erreur lors de la création du paiement",
                detail: errorMessage,
            },
            { status: 500 }
        );
    }
}
