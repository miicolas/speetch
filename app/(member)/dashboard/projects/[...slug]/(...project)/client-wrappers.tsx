"use client";

import React from "react";
import { StatusUpdate } from "./status-update";
import { PaymentDateUpdate } from "./payment-date-update";
import { ProjectDateUpdate } from "./date-project-update";
import { useProjectService } from "./project-service";

export function StatusUpdateWrapper({
    projectId,
    currentStatus,
}: {
    projectId: string;
    currentStatus: string;
}) {
    const { updateProject } = useProjectService();

    const handleUpdate = async (status: string) => {
        return await updateProject(projectId, { status });
    };

    return (
        <StatusUpdate
            currentStatus={currentStatus}
            onUpdate={handleUpdate}
        />
    );
}

export function PaymentDateUpdateWrapper({
    projectId,
    currentPaymentDate,
}: {
    projectId: string;
    currentPaymentDate: Date | null;
}) {
    const { updateProject } = useProjectService();

    const handleUpdate = async (date: Date) => {
        return await updateProject(projectId, { paymentDate: date });
    };

    return (
        <PaymentDateUpdate
            currentPaymentDate={currentPaymentDate}
            onUpdate={handleUpdate}
        />
    );
}

export function ProjectDateUpdateWrapper({
    projectId,
    currentProjectDate,
}: {
    projectId: string;
    currentProjectDate: Date | null;
}) {
    const { updateProject } = useProjectService();

    const handleUpdate = async (date: Date) => {
        return await updateProject(projectId, { endDate: date });
    };

    return (
        <ProjectDateUpdate
            currentProjectDate={currentProjectDate}
            onUpdate={handleUpdate}
        />
    );
}
