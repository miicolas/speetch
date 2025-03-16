import db from "@/db";
import { stripeSessionPayment } from "@/db/stripe-schema";
import { eq, ilike } from "drizzle-orm";
import { Payment } from "@/lib/types/payment-type";

export class Payments {
    constructor() {}

    static async getPayment(projectId: string) {
        return await db
            .select()
            .from(stripeSessionPayment)
            .where(eq(stripeSessionPayment.projectId, projectId))
            .execute();
    }

    static async getPayments(userId: string): Promise<Payment[]> {
        const payments = await db
            .select()
            .from(stripeSessionPayment)
            .where(eq(stripeSessionPayment.userId, userId))
            .execute();

        return payments.map(payment => ({
            ...payment,
            amount: Number(payment.amount)
        }));
    }

    static async updatePayment(projectId: string, paymentStatus: string) {
        return await db
            .update(stripeSessionPayment)
            .set({ status: paymentStatus })
            .where(eq(stripeSessionPayment.projectId, projectId))
            .execute();
    }

    static async updatePaymentByUrl(sessionId: string, status: string) {
        return await db
            .update(stripeSessionPayment)
            .set({
                status: status,
                updatedAt: new Date(),
            })
            .where(ilike(stripeSessionPayment.url, `%${sessionId}%`))
            .returning();
    }
}
