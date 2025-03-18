"use server";

import { z } from "zod";
import { Projects } from "@/models/projects";

const bodySchema = z.object({
    projectId: z.string(),
});

export async function getProjectContact(body: z.infer<typeof bodySchema>) {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                error: "Invalid body",
                issues: validatedBody.error.issues,
                status: "error",
            };
        }

        const { projectId } = validatedBody.data;

        const getContact = await Projects.getProjectContact(projectId);

        if (!getContact) {
            return {
                error: "Contact not found",
                status: "error",
            };
        }

        return {
            content: getContact,
            status: "success",
        };
    } catch (error) {
        return {
            error: "Failed to get project contact",
            status: "error",
        };
    }
}
