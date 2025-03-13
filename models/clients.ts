import db from "@/db";
import { client } from "@/db/client-schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
export class Clients {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public address: string,
        public state: string,
        public city: string,
        public zip: string,
        public country: string,
        public website: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
    static async getClients(userId: string) {
        return await db
            .select()
            .from(client)
            .where(eq(client.userId, userId))
            .execute();
    }

    static async addClient(
        name: string,
        type: string,
        email: string,
        phone: string,
        address: string,
        state: string,
        city: string,
        zip: string,
        country: string,
        website: string,
        notes: string,
        vatNumber: string,
        contactName: string,
        contactEmail: string,
        contactPhone: string,
        contactPosition: string,
        userId: string
    ) {
        return await db
            .insert(client)
            .values({
                id: uuidv4(),
                name,
                email,
                phone,
                address,
                state,
                city,
                zip,
                country,
                website,
                notes,
                vatNumber,
                contactName,
                contactEmail,
                contactPhone,
                contactPosition,
                userId,
                type,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .execute();
    }

    static async getClient(clientId: string) {
        return await db
            .select()
            .from(client)
            .where(eq(client.id, clientId))
            .execute();
    }
}
