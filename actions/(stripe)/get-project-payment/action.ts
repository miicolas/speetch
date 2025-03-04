"use server";

import { z } from "zod";
import db from "@/db";
import { eq } from "drizzle-orm";
import { FormResponse } from "@/lib/types/form-type";
import { stripeSessionPayment } from "@/db/stripe-schema";
import { revalidatePath } from "next/cache";

const bodySchema = z.object({
    userId: z.string(),
});

export async function getProjectPayment(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues,
            };
        }

        const slug = "191919";

        const projectPayment = await db.select().from(stripeSessionPayment).where(eq(stripeSessionPayment.userId, validatedBody.data.userId));

        revalidatePath(`/dashboard/projects/${slug}`);

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
            message: "Failed to add email to newsletter",
        };
    }
}