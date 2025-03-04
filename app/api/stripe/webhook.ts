import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { stripe } from "@/lib/stripe";
import { stripeSessionPayment } from "@/db/stripe-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("Erreur de webhook:", errorMessage);
        return NextResponse.json(
            {
                status: "error",
                error: `Erreur webhook: ${errorMessage}`,
            },
            { status: 400 }
        );
    }

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const stripeSessionId = session.id;

            console.log("✅ Paiement réussi pour la session:", stripeSessionId);

            try {
                const dbResult = await db
                    .update(stripeSessionPayment)
                    .set({ status: "completed" })
                    .where(eq(stripeSessionPayment.id, stripeSessionId));
                

                if (!dbResult) {
                    return NextResponse.json({ status: "error", error: "Erreur lors de la mise à jour de la session de paiement" }, { status: 400 });
                }

                const paymentSessions = await db
                    .select()
                    .from(stripeSessionPayment)
                    .where(eq(stripeSessionPayment.id, stripeSessionId));
                
                if (paymentSessions && paymentSessions.length > 0) {
                    const userId = paymentSessions[0].userId;
                    revalidatePath(`/dashboard/projects/${userId}`);
                }
                
                return NextResponse.json({ received: true });
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : "Erreur inconnue";
                console.error("Erreur lors du traitement du webhook:", error);
                return NextResponse.json(
                    {
                        status: "error",
                        error: "Erreur de traitement",
                        detail: errorMessage,
                    },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json({ status: "success", received: true });
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("Erreur lors du traitement du webhook:", error);
        return NextResponse.json(
            {
                status: "error",
                error: "Erreur de traitement",
                detail: errorMessage,
            },
            { status: 500 }
        );
    }
}
