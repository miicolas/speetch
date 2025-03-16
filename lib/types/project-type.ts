export interface Project {
    id: string;
    name: string;
    description: string;
    amount: number;
    status: string;
    paymentDate: Date;
    paymentStatus: string;
    paymentMethod: string;
    clientId: string | null;
    endDate: Date;
    userId: string | null;
    client?: {
        name: string;
    } | null;
    createdAt: Date | null;
    updatedAt: Date | null;
} 