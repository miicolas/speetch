import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface StripeErrorLike {
    type?: string;
    code?: string;
    message?: string;
    doc_url?: string;
}

export async function POST(req: NextRequest) {
    try {
        console.log("Traitement de la requête de création du Paiement");

        const body = await req.json();
        const { amount, stripeAccountId, description } = body;

        console.log("Données reçues:", {
            amount,
            stripeAccountId,
            description,
        });

        if (!amount || !stripeAccountId || !description) {
            console.log(
                "Erreur: amount, stripeAccountId ou description requis"
            );
            return NextResponse.json(
                {
                    error: "amount, stripeAccountId ou description requis",
                },
                { status: 400 }
            );
        }
        console.log("Création du Paiement pour:", amount);

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
                success_url: `${process.env.BETTER_AUTH_URL}/dashboard`,
                cancel_url: `${process.env.BETTER_AUTH_URL}/dashboard`,
                payment_intent_data: {
                    application_fee_amount: Math.round(amount * 0.1 * 100), // 10% de commission pour la plateforme
                    transfer_data: {
                        destination: stripeAccountId, 
                    },
                },
            });
            if (!session) {
                console.log(
                    "Erreur lors de la mise à jour de la base de données"
                );
                return NextResponse.json(
                    {
                        error: "Erreur lors de la mise à jour de la base de données",
                    },
                    { status: 500 }
                );
            }

            console.log("Session créée avec succès:", session);

            return NextResponse.json({ paymentLink: session.url });
        } catch (stripeError: unknown) {
            const err = stripeError as StripeErrorLike;
            console.error("Erreur Stripe spécifique:", {
                type: err.type,
                code: err.code,
                message: err.message,
                docUrl: err.doc_url,
            });

            if (err.code === "secret_key_required") {
                return NextResponse.json(
                    {
                        error: "Configuration Stripe incorrecte. Utilisez une clé secrète valide.",
                        detail: err.message,
                    },
                    { status: 500 }
                );
            }

            if (
                err.message &&
                err.message.includes("Connect")
            ) {
                return NextResponse.json(
                    {
                        error: "Stripe Connect n'est pas activé sur ce compte",
                        detail: "Activez Stripe Connect dans votre tableau de bord Stripe",
                        docUrl: "https://stripe.com/docs/connect",
                    },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                {
                    error: "Erreur lors de la communication avec Stripe",
                    detail: err.message || "Détails non disponibles",
                },
                { status: 500 }
            );
        }
    } catch (error: unknown) {
        console.error(
            "Erreur générale lors de la création du compte Stripe:",
            error
        );
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        return NextResponse.json(
            {
                error: "Une erreur est survenue lors de la création du paiement",
                detail: errorMessage,
            },
            { status: 500 }
        );
    }
}
