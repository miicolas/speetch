import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { stripe } from "@/lib/stripe";
import { stripeSessionPayment } from "@/db/stripe-schema";
import { eq } from "drizzle-orm";

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

            const result = await db
                .update(stripeSessionPayment)
                .set({
                    status: "paid",
                    updatedAt: new Date(),
                })
                .where(eq(stripeSessionPayment.id, stripeSessionId))
                .returning({ id: stripeSessionPayment.id });

            if (result && result.length > 0) {
                console.log("✅ Base de données mise à jour avec succès!");
            } else {
                console.warn(
                    "⚠️ Session non trouvée dans la base de données:",
                    stripeSessionId
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
