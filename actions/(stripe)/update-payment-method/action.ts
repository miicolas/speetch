"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/types/form-type";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-02-24.acacia",
});

const bodySchema = z.object({
    stripeCustomerId: z.string(),
    returnUrl: z.string().optional(),
});

export async function createUpdatePaymentSession(
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

        const { stripeCustomerId, returnUrl } = validatedBody.data;

        const session = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: returnUrl || `${process.env.BETTER_AUTH_URL}/dashboard/subscription`,
            flow_data: {
                type: 'payment_method_update',
            }
        });

        return {
            status: "success",
            message: "Payment method update session created successfully",
            content: { url: session.url },
        };
    } catch (error) {
        console.error(
            "Error creating payment method update session:",
            error
        );

        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: error.issues,
            };
        }

        return {
            status: "error",
                message: "Impossible to create payment method update session",
        };
    }
}
