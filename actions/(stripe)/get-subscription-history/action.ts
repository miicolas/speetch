"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/types/form-type";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-02-24.acacia",
});

const bodySchema = z.object({
    stripeCustomerId: z.string(),
    userId: z.string(),
    limit: z.number().optional().default(10),
});

export async function getSubscriptionHistory(
    body: z.infer<typeof bodySchema>
): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues,
            };
        }

        const { stripeCustomerId, limit } = validatedBody.data;

        const charges = await stripe.charges.list({
            customer: stripeCustomerId,
            limit: limit,
        });

        const paymentHistory = charges.data.map((charge) => ({
            id: charge.id,
            amount: charge.amount,
            currency: charge.currency,
            status: charge.status,
            date: new Date(charge.created * 1000).toISOString(),
            receiptUrl: charge.receipt_url,
        }));

        return {
            status: "success",
            content: paymentHistory,
        };
    } catch (error) {
        console.error("Error when retrieving payment history:", error);

        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: error.issues,
            };
        }

        return {
            status: "error",
            message: "Unable to retrieve payment history",
        };
    }
}
