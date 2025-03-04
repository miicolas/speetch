"use server";

import { getServerSession } from "@/lib/server-session";
import db from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";
import { FormResponse } from "@/lib/types/form-type";
import { z } from "zod";

const bodySchema = z.object({
    price: z.number(),
    description: z.string(),
});

export async function handleFormPayment(
    body: z.infer<typeof bodySchema>
): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                errors: validatedBody.error.errors,
            };
        }

        const { price, description } = validatedBody.data;

        const session = await getServerSession();

        if (!session) {
            return {
                status: "error",
                message: "Session not found",
            };
        }

        const stripeAccountId = await db
            .select({ stripeAccountId: user.stripeAccountId })
            .from(user)
            .where(eq(user.id, session?.user.id));

        if (!stripeAccountId) {
            return {
                status: "error",
                message: "Stripe account not found",
            };
        }

        const response = await fetch(
            `${process.env.BETTER_AUTH_URL}/api/stripe/create-payment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: price,
                    description,
                    userId: session.user.id,
                    stripeAccountId: stripeAccountId[0].stripeAccountId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Erreur lors de la création du paiement");
        }

        const data = await response.json();

        return {
            status: "success",
            content: data.paymentLink,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: error.issues,
            };
        }
        console.error("Database error:", error);
        return {
            status: "error",
            message: "Failed to add email to newsletter",
        };
    }
}
