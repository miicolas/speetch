import { z } from "zod";
import { FormResponse } from "@/lib/types/form-type";
import { User } from "@/models/user";

const bodySchema = z.object({
    stripeCustomerId: z.string(),
});

export async function getSubscription(
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

        const { stripeCustomerId } = validatedBody.data;

        const getSubscription = await User.getSubscription(stripeCustomerId);

        if (!getSubscription) {
            return {
                status: "error",
                message: "No subscription found",
            };
        }

        return {
            status: "success",
            content: getSubscription,
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
            message: "Failed to get subscription",
        };
    }
}
