"use client";

import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getStatusDetails } from "@/lib/utils/project-status";

const statusOptions = [
    { value: "not_started", ...getStatusDetails("not_started") },
    { value: "pending", ...getStatusDetails("pending") },
    { value: "done", ...getStatusDetails("done") },
    { value: "failed", ...getStatusDetails("failed") },
];

interface StatusUpdateProps {
    currentStatus: string;
    onUpdate: (status: string) => Promise<boolean>;
}

export function StatusUpdate({ currentStatus, onUpdate }: StatusUpdateProps) {
    const [status, setStatus] = useState(currentStatus);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === status) return;

        setIsUpdating(true);

        try {
            const toastId = toast.loading("Updating status...");
            const success = await onUpdate(newStatus);

            if (success) {
                setStatus(newStatus);
                toast.success("Status updated successfully", { id: toastId });
            } else {
                toast.error("Failed to update status", { id: toastId });
            }
        } catch (error) {
            toast.error("Error updating status");
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex flex-col space-y-3">
            <Select
                value={status}
                onValueChange={handleStatusChange}
                disabled={isUpdating}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent>
                    {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                                <option.icon className="h-4 w-4 text-muted-foreground" />
                                <span>{option.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
