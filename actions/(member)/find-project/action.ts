"use server";

import { z } from "zod";
import db from "@/db";
import { eq, and, like, inArray } from "drizzle-orm";
import { FormResponse } from "@/lib/types/form-type";
import { projects } from "@/db/project-schema";
import { client } from "@/db/client-schema";

const bodySchema = z.object({
    email: z.string().email(),
    projectName: z.string().min(1),
});

export async function findProject(
    body: z.infer<typeof bodySchema>
): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Format de données invalide",
                errors: validatedBody.error.issues,
            };
        }

        const { email, projectName } = validatedBody.data;

        // Recherche du client par email
        const clientResult = await db
            .select()
            .from(client)
            .where(eq(client.email, email));

        if (!clientResult || clientResult.length === 0) {
            return {
                status: "error",
                message: "Aucun client trouvé avec cet email",
            };
        }

        // Recherche des projets pour ce client avec le nom spécifié
        const clientIds = clientResult.map(c => c.id);
        
        const projectResults = await db
            .select()
            .from(projects)
            .where(
                and(
                    inArray(projects.clientId, clientIds),
                    like(projects.name, `%${projectName}%`)
                )
            );

        if (!projectResults || projectResults.length === 0) {
            return {
                status: "error",
                message: "Aucun projet trouvé pour ce client avec ce nom",
            };
        }

        return {
            status: "success",
            content: projectResults,
        };
    } catch (error) {
        console.error("Erreur de base de données:", error);
        return {
            status: "error",
            message: "Échec de la recherche de projet",
        };
    }
} 