"use server";

import { getServerSession } from "@/lib/server-session";
import { Projects } from "@/models/projects";
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    amount: z.number(),
    status: z.string(),
    payment_date: z.date(),
    payment_status: z.string(),
    payment_method: z.string(),
    client_id: z.string(),
    end_date: z.date(),
});

export async function addProject(body: z.infer<typeof bodySchema>) {
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
            description,
            amount,
            status,
            payment_date,
            payment_status,
            payment_method,
            client_id,
            end_date,
        } = validatedBody.data;

        const addProject = await Projects.addProject(
            name,
            description,
            amount,
            status,
            payment_date,
            payment_status,
            payment_method,
            client_id,
            end_date,
            userId
        );

        if (!addProject) {
            return {
                status: "error",
                message: "Failed to add project",
            };
        }

        return {
            status: "success",
            message: "Project added successfully",
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
            message: "Failed to add project",
        };
    }
}
