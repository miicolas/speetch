"use server";

import { z } from "zod";
import db from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";
import { FormResponse } from "@/lib/types/form-type";

const bodySchema = z.object({
    userId: z.string(),
});

export async function getStripeAccount(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues,
            };
        }

        const stripeAccount = await db
            .select({ stripeAccountId: user.stripeAccountId })
            .from(user)
            .where(eq(user.id, validatedBody.data.userId));


        if (!stripeAccount) {
            return {
                status: "error",
                message: "Stripe account not found",
            };
        }

        return {
            status: "success",
            content: stripeAccount,
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
