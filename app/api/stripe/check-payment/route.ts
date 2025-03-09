import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/db";
import { ilike } from "drizzle-orm";
import { stripeSessionPayment } from "@/db/stripe-schema";

export async function GET(req: NextRequest) {
    const sessionId = new URL(req.url).searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json(
            { status: "error", message: "Session manquante" },
            { status: 400 }
        );
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "unpaid") {
            
            return NextResponse.json({ status: "pending" });
        }

        const paymentPaid = await db
            .update(stripeSessionPayment)
            .set({
                status: "paid",
            })
            .where(ilike(stripeSessionPayment.url, `%${sessionId}%`))
            .returning();
        if (paymentPaid.length > 0) {
            return NextResponse.json({ status: "paid" });
        }

        if (session.payment_status === "paid") {
            return NextResponse.json({ status: "paid" });
        } else {
            return NextResponse.json({ status: "pending" });
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du paiement:", error);
        return NextResponse.json(
            { status: "error", message: "Erreur de vérification" },
            { status: 500 }
        );
    }
}
