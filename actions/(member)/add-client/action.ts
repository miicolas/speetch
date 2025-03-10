"use server";

import { getServerSession } from "@/lib/server-session";
import { Clients } from "@/models/clients";
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    notes: z.string(),
    type: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    state: z.string(),
    city: z.string(),
    zip: z.string(),
    country: z.string(),
    website: z.string(),
    vatNumber: z.string(),
    contactName: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    contactPosition: z.string(),
});

export async function addClient(body: z.infer<typeof bodySchema>) {
    try {
        const session = await getServerSession();

        if (!session) {
            return {
                status: "error",
                message: "Unauthorized",
            };
        }

        const userId = session.user.id;
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues,
            };
        }

        const {
            name,
            notes,
            type,
            email,
            phone,
            address,
            state,
            city,
            zip,
            country,
            website,
            vatNumber,
            contactName,
            contactEmail,
            contactPhone,
            contactPosition,
        } = validatedBody.data;

        const addClient = await Clients.addClient(
            name,
            type,
            email,
            phone,
            address,
            state,
            city,
            zip,
            country,
            website,
            notes,
            vatNumber,
            contactName,
            contactEmail,
            contactPhone,
            contactPosition,
            userId
        );

        if (!addClient) {
            return {
                status: "error",
                message: "Failed to add client",
            };
        }

        return {
            status: "success",
            message: "Client added successfully",
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
