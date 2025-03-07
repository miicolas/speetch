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
}