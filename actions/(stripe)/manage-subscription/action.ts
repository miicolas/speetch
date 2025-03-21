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

export async function createManageSubscriptionSession(
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
            return_url:
                returnUrl ||
                `${process.env.BETTER_AUTH_URL}/dashboard/subscription?success=true`,
            flow_data: {
                type: "subscription_update",
                subscription_update: {
                    subscription:
                        await getActiveSubscriptionId(stripeCustomerId),
                },
            },
        });

        return {
            status: "success",
            message: "Manage subscription session created successfully",
            content: { url: session.url },
        };
    } catch (error) {
        console.error("Error creating manage subscription session:", error);

        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: error.issues,
            };
        }

        return {
            status: "error",
            message: "Impossible to create manage subscription session",
        };
    }
}

async function getActiveSubscriptionId(customerId: string): Promise<string> {
    const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
    });

    if (subscriptions.data.length === 0) {
        throw new Error("No active subscription found");
    }

    return subscriptions.data[0].id;
}
