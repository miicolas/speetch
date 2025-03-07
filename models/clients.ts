import db from "@/db";
import { client } from "@/db/client-schema";
import { eq } from "drizzle-orm";

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
    public updatedAt: Date,
  ) { }
  static async getClients(userId: string) {
    return await db.select().from(client).where(eq(client.id, userId)).execute();
  }

}
