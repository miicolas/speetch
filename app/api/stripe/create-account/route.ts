import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

interface StripeErrorLike {
    type?: string;
    code?: string;
    message?: string;
    doc_url?: string;
}

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email requis" },
                { status: 400 }
            );
        }

        try {
            const account = await stripe.accounts.create({
                type: "express",
                country: "FR",
                email: email,
                capabilities: {
                    transfers: { requested: true },
                    card_payments: { requested: true },
                },
            });

            const updatedUser = await db
                .update(user)
                .set({ stripeAccountId: account.id })
                .where(eq(user.email, email));

            if (!updatedUser) {
                return NextResponse.json(
                    {
                        error: "Erreur lors de la mise à jour de la base de données",
                    },
                    { status: 500 }
                );
            }

            const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: `${process.env.BETTER_AUTH_URL}/dashboard`,
                return_url: `${process.env.BETTER_AUTH_URL}/dashboard`,
                type: "account_onboarding",
            });

            return NextResponse.json({
                url: accountLink.url,
                accountId: account.id,
            });
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
                        error: "Stripe Connect is not activated on this account",
                        detail: "Activate Stripe Connect in your Stripe dashboard",
                        docUrl: "https://stripe.com/docs/connect",
                    },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                {
                    error: "Error communicating with Stripe",
                    detail: err.message || "Details not available",
                },
                { status: 500 }
            );
        }

    } catch (error: unknown) {
        console.error(
            "General error when creating the Stripe account:",
            error
        );
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            {
                error: "An error occurred when creating the account",
                detail: errorMessage,
            },
            { status: 500 }
        );
    }
}
