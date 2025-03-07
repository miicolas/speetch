import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
    console.log("🔔 Webhook Stripe appelé!");
    
    const body = await req.text();
    console.log("📦 Taille du corps:", body.length, "bytes");
    
    const signature = req.headers.get("stripe-signature") || "";
    console.log("🔑 Signature présente:", !!signature);

    const webhookSecret =
        process.env.NODE_ENV === "development"
            ? process.env.STRIPE_WEBHOOK_SECRET_LOCAL
            : process.env.STRIPE_WEBHOOK_SECRET;

    console.log("Environnement:", process.env.NODE_ENV);
    console.log("Secret webhook utilisé:", webhookSecret ? "Défini" : "Non défini");

    if (!webhookSecret) {
        console.error("⛔ Stripe webhook secret not configured!");
        return NextResponse.json(
            { status: "error", error: "Missing configuration" },
            { status: 500 }
        );
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log("✅ Événement Stripe validé:", event.type);
        console.log("📋 Données d'événement:", JSON.stringify(event.data.object).substring(0, 200) + "...");
        
        const supportedEvents = [
            "checkout.session.completed",
            "checkout.session.async_payment_succeeded",
            "customer.subscription.created",
            "customer.subscription.updated", 
            "customer.subscription.deleted",
            "invoice.payment_succeeded",
            "invoice.payment_failed",
            "payout.paid",
            "payout.failed",
            "payout.created",
            "payout.updated",
        ];

        if (supportedEvents.includes(event.type)) {
            console.log("✅ Événement supporté reçu:", event.type);
        } else {
            console.log("⚠️ Événement non géré:", event.type);
        }
    } catch (error) {
        console.error("Error verifying webhook:", error);
        return NextResponse.json(
            { status: "error", error: "Webhook verification failed" },
            { status: 400 }
        );
    }

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const stripeSessionId = session.id;
            const userId = session.metadata?.userId;

            const paymentStatus = session.payment_status;

            console.log(stripeSessionId, paymentStatus, userId, "update status");

        } else if (event.type === "customer.subscription.updated") {
            const session = event.data.object;
            const stripeSessionId = session.id;
            const paymentStatus = session.status;

            console.log(stripeSessionId, paymentStatus, "update status");
        } else if (event.type === "customer.subscription.deleted") {
            const session = event.data.object;
            const stripeSessionId = session.id;
            const paymentStatus = session.status;

            console.log(stripeSessionId, paymentStatus, "update status");
        } else {
            console.log("🔍 Unhandled Stripe event:", event.type);
        }

        console.log("🔍 Unhandled Stripe event:", event.type);
        return NextResponse.json({
            status: "success",
            received: true,
            type: event.type,
        });
    } catch (error) {
        console.error("❌ Error processing webhook:", error);
        return NextResponse.json(
            { status: "error", error: "Error processing webhook" },
            { status: 500 }
        );
    }
}
