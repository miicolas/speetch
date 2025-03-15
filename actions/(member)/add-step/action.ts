"use server";

import { Projects } from "@/models/projects";
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    projectId: z.string(),
});

export async function addStep(body: z.infer<typeof bodySchema>) {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues,
            };
        }

        const { name, description, status, projectId } = validatedBody.data;

        const addStep = await Projects.addStep(projectId, {
            name,
            description,
            status,
        });

        if (!addStep) {
            return {
                status: "error",
                message: "Failed to add step",
            };
        }

        return {
            status: "success",
            message: "Step added successfully",
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
            message: "Failed to add client",
        };
    }
}
