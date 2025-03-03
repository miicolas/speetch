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
        console.log(
            "Traitement de la requête de création de compte Stripe Connect"
        );

        const body = await req.json();
        const { email, name } = body;

        console.log("Données reçues:", { email, name });

        if (!email) {
            console.log("Erreur: Email requis");
            return NextResponse.json(
                { error: "Email requis" },
                { status: 400 }
            );
        }
        console.log("Création du compte Stripe Connect pour:", email);

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

            console.log("Compte Stripe créé avec succès:", account.id);
            const updatedUser = await db
                .update(user)
                .set({ stripeAccountId: account.id })
                .where(eq(user.email, email));

            if (!updatedUser) {
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

            const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: `${process.env.BETTER_AUTH_URL}/onboarding`,
                return_url: `${process.env.BETTER_AUTH_URL}/dashboard`,
                type: "account_onboarding",
            });

            console.log("Lien d'onboarding généré:", accountLink.url);

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
                error: "Une erreur est survenue lors de la création du compte",
                detail: errorMessage,
            },
            { status: 500 }
        );
    }
}
