import "server-only";

import db from "@/db";
import { subscription } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

export class User {
    static async getSubscription(stripeCustomerId: string) {
        const subscriptionAction = await db
            .select()
            .from(subscription)
            .where(eq(subscription.stripeCustomerId, stripeCustomerId))
            .execute();

        return subscriptionAction[0];
    }
}
