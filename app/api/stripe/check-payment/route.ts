import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { Payments } from "@/models/payment";
import { Projects } from "@/models/projects";
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

        const paymentPaid = await Payments.updatePaymentByUrl(
            sessionId,
            "paid"
        );

        if (!paymentPaid || paymentPaid.length === 0) {
            return NextResponse.json({ status: "pending" });
        }

        const getProject = await Projects.getProject(paymentPaid[0].projectId);

        if (getProject.length > 0) {
            const project = getProject[0];

            if (project.paymentMethod === "1_payment") {
                await Projects.updateProject(project.id, {
                    paymentStatus: "paid",
                });
            } else {
                if (project.paymentStatus === "partially_paid") {
                    await Projects.updateProject(project.id, {
                        paymentStatus: "paid",
                    });
                } else if (project.paymentStatus === "paid") {
                    await Projects.updateProject(project.id, {
                        paymentStatus: "paid",
                    });
                } else {
                    {
                        await Projects.updateProject(project.id, {
                            paymentStatus: "partially_paid",
                        });
                    }
                }
            }
        }

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
