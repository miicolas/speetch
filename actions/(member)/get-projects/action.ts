'use server';

import { z } from 'zod';
import { FormResponse } from '@/lib/types/form-type';
import { Projects } from '@/models/projects';


const bodySchema = z.object({
    userId: z.string(),
});

export async function getProjects(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues,
            };
        }

        const { userId } = validatedBody.data;

        const getProjects = await Projects.getProjects(userId);
        
        
        if (!getProjects) {
            return {
                status: "error",
                message: "No projects found",
            };
        }

        return {
            status: "success",
            content: getProjects,
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