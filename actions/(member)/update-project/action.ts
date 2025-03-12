"use server";

import { FormResponse } from "@/lib/types/form-type";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerSession } from "@/lib/server-session";
import { Projects } from "@/models/projects";

const bodySchema = z.object({
    projectId: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    amount: z.number().optional(),
    status: z.string().optional(),
    paymentDate: z.union([z.date(), z.string()]).optional().transform(val => 
        val ? (typeof val === 'string' ? new Date(val) : val) : undefined
    ),
    paymentStatus: z.string().optional(),
    paymentMethod: z.string().optional(),
    clientId: z.string().optional(),
    endDate: z.union([z.date(), z.string()]).optional().transform(val => 
        val ? (typeof val === 'string' ? new Date(val) : val) : undefined
    ),
});

export async function updateProject(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const session = await getServerSession();
        if (!session) {
            return {
                status: "error",
                message: "Non autorisé",
            };
        }

        const bodyParsed = bodySchema.parse(body);
        const { projectId, ...updateData } = bodyParsed;

        // Vérifier si l'utilisateur a accès à ce projet
        const existingProject = await Projects.getProject(projectId);

        if (!existingProject) {
            return {
                status: "error",
                message: "Projet non trouvé ou non autorisé",
            };
        }

        const updatedProject = await Projects.updateProject(projectId, updateData);

        revalidatePath(`/dashboard/projects/${projectId}`);

        return {
            status: "success",
            message: "Projet mis à jour avec succès",
            content: {
                id: projectId,
                updated: true
            },
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Format de données invalide",
                errors: error.errors,
            };
        }
        console.error("Erreur de mise à jour du projet:", error);
        return {
            status: "error",
            message: "Échec de la mise à jour du projet",
        };
    }
} 