import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { stripe } from "@/lib/stripe";
import { stripeSessionPayment } from "@/db/stripe-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const config = {
    api: {
        bodyParser: false,
    },
};

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

    if (process.env.NODE_ENV === "development") {
        console.log("Body size:", body.length, "bytes");
        console.log("Body start:", body.substring(0, 50) + "...");
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

        console.log("✅ Stripe event validated:", event.type);
        if (process.env.NODE_ENV === "development") {
            console.log(
                "Data:",
                JSON.stringify(event.data.object).substring(0, 100) + "..."
            );
        }
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Error unknown";
        console.error("Error webhook:", errorMessage);

        if (process.env.NODE_ENV === "development") {
            console.error("Request body:", body.substring(0, 50) + "...");
            console.error(
                "Signature provided:",
                signature.substring(0, 20) + "..."
            );
        }

        return NextResponse.json(
            {
                status: "error",
                error: `Error webhook: ${errorMessage}`,
            },
            { status: 400 }
        );
    }

    try {
        if (
            event.type === "checkout.session.completed" ||
            event.type === "payment_intent.succeeded" ||
            event.type === "checkout.session.async_payment_succeeded"
        ) {
            const session = event.data.object;
            const stripeSessionId = session.id;

            if (
                process.env.NODE_ENV === "development" &&
                event.livemode === false
            ) {
                console.log("Test mode detected - Simulating success");

                try {
                    const dbResult = await db
                        .update(stripeSessionPayment)
                        .set({ status: "completed" })
                        .where(eq(stripeSessionPayment.id, stripeSessionId));

                    if (!dbResult) {
                        console.log(
                            "Error updating the payment session:",
                            stripeSessionId
                        );
                        return NextResponse.json(
                            {
                                status: "error",
                                error: "Error updating the payment session",
                            },
                            { status: 400 }
                        );
                    }

                    const paymentSessions = await db
                        .select()
                        .from(stripeSessionPayment)
                        .where(eq(stripeSessionPayment.id, stripeSessionId));

                    if (paymentSessions && paymentSessions.length > 0) {
                        const userId = paymentSessions[0].userId;
                        revalidatePath(`/dashboard/projects/${userId}`);
                        console.log("Path revalidated for user:", userId);
                    }
                } catch (dbError) {
                    console.log("Error ignored in development mode:", dbError);
                }

                return NextResponse.json({
                    status: "success",
                    received: true,
                    mode: "development",
                    message: "Test event processed successfully",
                });
            }

            try {
                const dbResult = await db
                    .update(stripeSessionPayment)
                    .set({ status: "completed" })
                    .where(eq(stripeSessionPayment.id, stripeSessionId));

                if (!dbResult) {
                    console.error(
                        "Error updating the payment session:",
                        stripeSessionId
                    );
                    return NextResponse.json(
                        {
                            status: "error",
                            error: "Error updating the payment session",
                        },
                        { status: 400 }
                    );
                }

                const paymentSessions = await db
                    .select()
                    .from(stripeSessionPayment)
                    .where(eq(stripeSessionPayment.id, stripeSessionId));

                if (paymentSessions && paymentSessions.length > 0) {
                    const userId = paymentSessions[0].userId;
                    revalidatePath(`/dashboard/projects/${userId}`);
                    console.log("Path revalidated for user:", userId);
                }

                return NextResponse.json({
                    status: "success",
                    received: true,
                });
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : "Error unknown";
                console.error("Error processing webhook:", errorMessage);
                return NextResponse.json(
                    {
                        status: "error",
                        error: "Error processing webhook",
                        detail: errorMessage,
                    },
                    { status: 500 }
                );
            }
        } else {
            console.log("Event Stripe ignored:", event.type);
        }

        return NextResponse.json({
            status: "success",
            received: true,
            type: event.type,
        });
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("Error when processing the webhook:", errorMessage);
        return NextResponse.json(
            {
                status: "error",
                error: "Error processing webhook",
                detail: errorMessage,
            },
            { status: 500 }
        );
    }
}
