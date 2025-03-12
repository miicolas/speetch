"use client";

import React, { useState } from "react";
import { CheckCircle, Clock, AlertCircle, RotateCw } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface StatusUpdateProps {
    currentStatus: string;
    onUpdate: (status: string) => Promise<boolean>;
}

const statusOptions = [
    {
        value: "not_started",
        label: "Non démarré",
        icon: Clock,
        variant: "outline",
    },
    {
        value: "pending",
        label: "En cours",
        icon: RotateCw,
        variant: "secondary",
    },
    {
        value: "done",
        label: "Terminé",
        icon: CheckCircle,
        variant: "default",
    },
    {
        value: "failed",
        label: "Échoué",
        icon: AlertCircle,
        variant: "destructive",
    },
];

export function StatusUpdate({ currentStatus, onUpdate }: StatusUpdateProps) {
    const [status, setStatus] = useState(currentStatus);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === status) return;
        
        setIsUpdating(true);
        
        try {
            const toastId = toast.loading("Mise à jour du statut...");
            const success = await onUpdate(newStatus);
            
            if (success) {
                setStatus(newStatus);
                toast.success("Statut mis à jour avec succès", { id: toastId });
            } else {
                toast.error("Échec de la mise à jour du statut", { id: toastId });
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour du statut");
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const currentStatusOption = statusOptions.find(
        (option) => option.value === status
    ) || statusOptions[0];

    const StatusIcon = currentStatusOption.icon;

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
                <Badge
                    variant={currentStatusOption.variant as "default" | "destructive" | "outline" | "secondary"}
                    className="px-2 py-1 text-sm flex items-center gap-1"
                >
                    <StatusIcon className="h-3.5 w-3.5" />
                    <span>{currentStatusOption.label}</span>
                </Badge>
            </div>

            <Select
                value={status}
                onValueChange={handleStatusChange}
                disabled={isUpdating}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Changer le statut" />
                </SelectTrigger>
                <SelectContent>
                    {statusOptions.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                        >
                            <div className="flex items-center gap-2">
                                <option.icon className="h-4 w-4" />
                                <span>{option.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
