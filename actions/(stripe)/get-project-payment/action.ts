"use server";

import { z } from "zod";
import db from "@/db";
import { eq, and } from "drizzle-orm";
import { FormResponse } from "@/lib/types/form-type";
import { stripeSessionPayment } from "@/db/stripe-schema";
const bodySchema = z.object({
    userId: z.string(),
    projectId: z.string().optional(),
});

export async function getProjectPayment(
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

        let projectPayment;

        if (validatedBody.data.projectId) {
            projectPayment = await db
                .select()
                .from(stripeSessionPayment)
                .where(
                    and(
                        eq(
                            stripeSessionPayment.userId,
                            validatedBody.data.userId
                        ),
                        eq(
                            stripeSessionPayment.projectId,
                            validatedBody.data.projectId
                        )
                    )
                );
        } else {
            projectPayment = await db
                .select()
                .from(stripeSessionPayment)
                .where(
                    eq(stripeSessionPayment.userId, validatedBody.data.userId)
                );
        }

        if (!projectPayment) {
            return {
                status: "error",
                message: "No project payment found",
            };
        }

        return {
            status: "success",
            content: projectPayment,
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
            message: "Failed to get project payments",
        };
    }
}
