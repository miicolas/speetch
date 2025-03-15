import db from "@/db";
import { stripeSessionPayment } from "@/db/stripe-schema";
import { eq } from "drizzle-orm";

export class Payments {
    constructor(
        
    ) {}

    static async getPayment(projectId: string) {
        return await db
            .select()
            .from(stripeSessionPayment)
            .where(eq(stripeSessionPayment.projectId, projectId))
            .execute();
    }
}
