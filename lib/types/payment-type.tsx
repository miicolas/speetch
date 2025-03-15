export interface Payment {
    id: string;
    url: string;
    status: string;
    projectId: string;
    userId: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}