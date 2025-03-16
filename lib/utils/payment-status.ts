export type PaymentStatus = "paid" | "pending" | "partially_paid" | "overdue";

export interface PaymentStatusDetails {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
}

export const getPaymentStatusDetails = (
    status: string
): PaymentStatusDetails => {
    switch (status) {
        case "paid":
            return { label: "Paid", variant: "default" };
        case "pending":
            return { label: "Pending", variant: "secondary" };
        case "partially_paid":
            return {
                label: "Partially paid",
                variant: "secondary",
            };
        case "overdue":
            return { label: "Overdue", variant: "destructive" };
        default:
            return { label: status, variant: "outline" };
    }
};
 