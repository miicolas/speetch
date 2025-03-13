'use server';

import { z } from 'zod';
import { FormResponse } from '@/lib/types/form-type';
import { Clients } from '@/models/clients';


const bodySchema = z.object({
    clientId: z.string(),
});

export async function getClient(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {

        const validatedBody = bodySchema.safeParse(body);
       
        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues
            };
        }

        const { clientId } = validatedBody.data;

        const getClient = await Clients.getClient(clientId);

        if (!getClient) {
            return {
                status: "error",
                message: "No client found",
            };
        }

        return {
            status: "success",
            content: getClient[0],
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
            message: "Failed to get client",
        };
    }
}