"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/types/form-type";
import { Projects } from "@/models/projects";

const bodySchema = z.object({
    projectId: z.string(),
});

export async function getProject(
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

        const getProject = await Projects.getProject(projectId);

        if (!getProject) {
            return {
                status: "error",
                message: "No project found",
            };
        }

        return {
            status: "success",
            content: getProject[0],
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
            message: "Failed to get projects",
        };
    }
}
