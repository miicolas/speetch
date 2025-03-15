"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/types/form-type";
import { Payments } from "@/models/payment";

const bodySchema = z.object({
    projectId: z.string(),
});

export async function getPayment(
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

        const { projectId } = validatedBody.data;

        const payments = await Payments.getPayment(projectId);

        if (!payments || payments.length === 0) {
            return {
                status: "error",
                message: "No payments found",
            };
        }

        return {
            status: "success",
            content: payments,
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
            message: "Failed to get payments",
        };
    }
}
