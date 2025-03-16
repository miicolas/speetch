export interface Client {
    id: string;
    name: string;
    type: string;
    email: string;
    phone: string;
    address: string;
    state: string;
    city: string;
    zip: string;
    country: string;
    website?: string;
    notes?: string;
    vatNumber?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactPosition?: string;
    createdAt: Date;
    updatedAt: Date;
}