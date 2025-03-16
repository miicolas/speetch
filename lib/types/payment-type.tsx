export interface Payment {
    id: string;
    userId: string;
    projectId: string;
    url: string;
    status: string;
    amount: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}