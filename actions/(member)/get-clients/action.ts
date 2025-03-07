'use server';

import { z } from 'zod';
import db from '@/db';
import { projects } from '@/db/project-schema';
import { eq } from 'drizzle-orm';
import { FormResponse } from '@/lib/types/form-type';
import { Projects } from '@/models/projects';
import { Clients } from '@/models/clients';


const bodySchema = z.object({
    userId: z.string(),
});

export async function getClients(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
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

        const getClients = await Clients.getClients(userId);

        if (!getClients) {
            return {
                status: "error",
                message: "No clients found",
            };
        }

        return {
            status: "success",
            content: getClients,
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