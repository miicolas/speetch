export interface Project {
    id: string;
    name: string;
    description: string;
    amount: number;
    status: string;
    paymentDate: Date;
    paymentStatus: string;
    paymentMethod: string;
    clientId: string;
    endDate: Date;
    userId: string;
    client?: {
        name: string;
    } | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Step {
    id?: string;
    name: string;
    description: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    projectId?: string;
}

export interface ProjectResult {
    id: string;
    name: string;
    amount: number;
    status: string;
    createdAt?: string | Date;
}