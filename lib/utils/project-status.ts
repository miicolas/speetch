import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export const getProjectStatus = (status: string) => {
    switch (status) {
        case "done":
            return {
                label: "Done",
                color: "bg-green-500",
                icon: CheckCircle,
            };
        case "pending":
            return {
                label: "Pending",
                color: "bg-indigo-500",
                icon: AlertCircle,
            };
        case "not_started":
            return {
                label: "Not started",
                color: "bg-amber-500",
                icon: Clock,
            };
        case "failed":
            return {
                label: "Failed",
                color: "bg-red-500",
                icon: AlertCircle,
            };
        
        default:
            return {
                label: "Undefined",
                color: "bg-gray-400",
                icon: Clock,    
            };
    }
};

export const getStatusDetails = (status: string) => {
    switch (status) {
        case "not_started":
            return {
                label: "Not started",
                value: "not_started",
                variant: "outline",
                icon: Clock,
            };
        case "pending":
            return {
                label: "In progress",
                value: "pending",
                variant: "secondary",
                icon: AlertCircle,
            };
        case "done":
            return {
                label: "Done",
                value: "done",
                variant: "default",
                icon: CheckCircle,
            };
        case "failed":
            return {
                label: "Failed",
                value: "failed",
                variant: "destructive",
                icon: XCircle,
            };
        default:
            return {
                label: status,
                variant: "outline",
                icon: Clock,
            };
    }
};

export const getStepStatusDetails = (status: string) => {
    switch (status) {
        case "completed":
            return {
                label: "Done",
                variant: "default",
                bgColor: "bg-green-50",
                textColor: "text-green-700",
                borderColor: "border-green-200",
                icon: CheckCircle,
            };
        case "in progress":
            return {
                label: "In Progress",
                variant: "secondary",
                bgColor: "bg-blue-50",
                textColor: "text-blue-700",
                borderColor: "border-blue-200",
                icon: AlertCircle,
            };
        case "not started":
        default:
            return {
                label: "Not started",
                variant: "outline",
                bgColor: "bg-gray-50",
                textColor: "text-gray-500",
                borderColor: "border-gray-200",
                icon: Clock,
            };
    }
};

