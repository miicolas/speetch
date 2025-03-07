import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    console.log("🔔 Webhook Stripe appelé!");

    const body = await req.text();
    const signature = req.headers.get("stripe-signature") || "";
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error("⛔ STRIPE_WEBHOOK_SECRET non configuré!");
        return NextResponse.json(
            { status: "error", error: "Missing configuration" },
            { status: 500 }
        );
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log(`✅ Événement Stripe validé: ${event.type}`);
    } catch (error) {
        console.error("❌ Erreur de validation du webhook:", error);
        return NextResponse.json(
            { status: "error", error: "Webhook verification failed" },
            { status: 400 }
        );
    }

    try {
        const eventType = event.type;
        const session = event.data.object;

        switch (eventType) {
            case "checkout.session.completed":
                await handleCheckoutSessionCompleted(session as Stripe.Checkout.Session);
                break;

            case "payment_intent.succeeded":
                await handlePaymentIntentSucceeded(session as Stripe.PaymentIntent);
                break;

            case "payment_intent.created":
                await handlePaymentIntentCreated(session as Stripe.PaymentIntent);
                break;
            case "product.created":
            case "price.created":
                await handleProductOrPriceUpdate(
                    session as Stripe.Product | Stripe.Price, 
                    eventType
                );
                break;

            case "charge.succeeded":
            case "charge.updated":
                await handleChargeUpdate(session as Stripe.Charge, eventType);
                break;

            default:
                console.warn(`⚠️ Événement non géré: ${eventType}`);
        }

        return NextResponse.json({
            status: "success",
            received: true,
            type: eventType,
        });
    } catch (error) {
        console.error("❌ Erreur de traitement du webhook:", error);
        return NextResponse.json(
            { status: "error", error: "Error processing webhook" },
            { status: 500 }
        );
    }
}

/**
 * Gère l'événement checkout.session.completed
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    console.log(
        `✅ Paiement confirmé pour ${session.id} - Status: ${session.payment_status}`
    );

    // 🔥 Mettez à jour la base de données ici
    // Exemple : await updateUserPaymentStatus(session.metadata?.userId, session.payment_status);
}

/**
 * Gère un paiement réussi via PaymentIntent
 */
async function handlePaymentIntentSucceeded(session: Stripe.PaymentIntent) {
    console.log(
        `💳 Paiement réussi pour l'intention ${session.id} - Montant: ${session.amount_received}`
    );

    // 🔥 Vous pouvez ici mettre à jour votre base de données pour confirmer le paiement
}

/**
 * Gère la création d'un produit ou d'un prix
 */
async function handleProductOrPriceUpdate(
    session: Stripe.Product | Stripe.Price, 
    eventType: string
) {
    console.log(
        `🛍️ ${eventType === "product.created" ? "Produit" : "Prix"} ajouté: ${session.id}`
    );

    // 🔥 Ajoutez ou mettez à jour votre base de données des produits/prix
}

/**
 * Gère une mise à jour de charge (paiement réussi ou mis à jour)
 */
async function handleChargeUpdate(session: Stripe.Charge, eventType: string) {
    console.log(
        `💰 Charge ${eventType === "charge.succeeded" ? "réussie" : "mise à jour"}: ${session.id}`
    );

    // 🔥 Ajoutez votre logique de gestion des paiements
}
/**
 * Gère la création d'une intention de paiement (payment_intent.created)
 */
async function handlePaymentIntentCreated(session: Stripe.PaymentIntent) {
    console.log(
        `🔄 Intention de paiement créée: ${session.id} - Montant: ${session.amount}`
    );

    // 🔥 Exemple: Stocker cette intention dans la base de données
    // await savePaymentIntentToDB(session.id, session.amount, session.currency, "pending");
}
