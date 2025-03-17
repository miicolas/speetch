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
            const toastId = toast.loading("Updating...");

            const result = await updateProjectAction({
                projectId,
                ...updates,
            });

            if (result.status === "success") {
                toast.success("Project updated successfully", { id: toastId });
                return true;
            } else {
                toast.error(`Error: ${result.message}`, { id: toastId });
                return false;
            }
        } catch (error) {
            toast.error("Error during update");
            console.error("Detailed error:", error);
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
