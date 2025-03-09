import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();

    const signature = req.headers.get("stripe-signature") || "";

    const webhookSecret =
        process.env.NODE_ENV === "development"
            ? process.env.STRIPE_WEBHOOK_SECRET_LOCAL
            : process.env.STRIPE_WEBHOOK_SECRET;

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
            "charge.updated",
            "payment_intent.created",
            "payment_intent.succeeded",
            "payment_intent.payment_failed",
            "payment_intent.payment_succeeded",
            "payment_intent.payment_method_changed",
            "payment_intent.payment_method_changed",
        ];

        if (supportedEvents.includes(event.type)) {
        } else {
            console.error("⚠️ Événement non géré:", event.type);
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

            console.log(
                stripeSessionId,
                paymentStatus,
                userId,
                "update status"
            );
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
            console.error("🔍 Unhandled Stripe event:", event.type);
        }

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
