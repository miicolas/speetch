"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateProject as updateProjectAction } from "@/actions/(member)/update-project/action";

type ProjectUpdateData = {
    projectId: string;
    status?: string;
    paymentDate?: Date;
    paymentStatus?: string;
    name?: string;
    description?: string;
    amount?: number;
    endDate?: Date;
};

export function useProjectService() {
    const [isLoading, setIsLoading] = useState(false);

    const updateProject = async (
        projectId: string,
        updates: Omit<ProjectUpdateData, "projectId">
    ): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Notification de début d'action pour un retour visuel immédiat
            const toastId = toast.loading("Mise à jour en cours...");

            const result = await updateProjectAction({
                projectId,
                ...updates,
            });

            if (result.status === "success") {
                toast.success("Projet mis à jour avec succès", { id: toastId });
                return true;
            } else {
                toast.error(`Échec: ${result.message}`, { id: toastId });
                return false;
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour");
            console.error("Erreur détaillée:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        updateProject,
    };
}
