import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";
import { PaymentMethodInfo } from "@/lib/types/project-view-types";

export interface PaymentStatusInfo {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: any;
    color: string;
}

export const getPaymentStatusDetails = (status: string): PaymentStatusInfo => {
    switch (status) {
        case "paid":
            return {
                label: "Paid",
                variant: "default",
                icon: CheckCircle,
                color: "text-green-500",
            };
        case "pending":
            return {
                label: "Pending",
                variant: "secondary",
                icon: Clock,
                color: "text-blue-500",
            };
        case "failed":
            return {
                label: "Failed",
                variant: "destructive",
                icon: XCircle,
                color: "text-red-500",
            };
        case "refunded":
            return {
                label: "Refunded",
                variant: "outline",
                icon: AlertCircle,
                color: "text-gray-500",
            };
        default:
            return {
                label: status || "Not defined",
                variant: "outline",
                icon: Clock,
                color: "text-gray-500",
            };
    }
};

export const getPaymentMethodDetails = (method: string): PaymentMethodInfo => {
    switch (method) {
        case "1_payment":
            return { label: "Single payment", variant: "default" as const };
        case "2_payments":
            return { label: "2 payments", variant: "secondary" as const };
        case "3_payments":
            return { label: "3 payments", variant: "destructive" as const };
        default:
            return { label: method, variant: "outline" as const };
    }
};
 