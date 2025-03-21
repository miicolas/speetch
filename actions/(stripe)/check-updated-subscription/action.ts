"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/types/form-type";
import Stripe from "stripe";
import db from "@/db";
import { subscription, user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-02-24.acacia",
});

const bodySchema = z.object({
    stripeCustomerId: z.string(),
});

export async function checkUpdatedSubscription(
    body: z.infer<typeof bodySchema>
): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Format de données invalide",
                errors: validatedBody.error.issues,
            };
        }

        const { stripeCustomerId } = validatedBody.data;

        const subscriptions = await stripe.subscriptions.list({
            customer: stripeCustomerId,
            limit: 1,
            expand: ["data.items.data.price"],
        });

        if (subscriptions.data.length === 0) {
            return {
                status: "success",
                message: "Aucun abonnement trouvé",
                content: { plan: "", status: "canceled" },
            };
        }

        const stripeSubscription = subscriptions.data[0];
        /*         const priceId = stripeSubscription.items.data[0].price.id;

        const price = await stripe.prices.retrieve(priceId, {
            expand: ["product"],
        });
        const product = price.product as Stripe.Product;

        // Logging détaillé pour identifier le problème
        console.log("DÉTAILS PRODUIT STRIPE:", {
            productId: product.id,
            productName: product.name,
            metadata: product.metadata,
            priceAmount: price.unit_amount,
            priceCurrency: price.currency,
            priceRecurring: price.recurring,
        }); */

        const nextBillingDate = new Date(
            stripeSubscription.current_period_end * 1000
        ).toLocaleDateString("fr-FR");

        const amountNextBilling = (
            (stripeSubscription.items.data[0].price.unit_amount || 0) / 100
        ).toString();
        const currency = stripeSubscription.items.data[0].price.currency;

/*         console.log(stripeSubscription.status, "stripbe status");
        console.log(stripeSubscription.items.data, "items"); */

        const plan = stripeSubscription.items.data[0].price.metadata.plan;


        let role = "FREE";
        if (stripeSubscription.status === "active") {
            if (plan === "basic") {
                role = "basic";
            } else if (plan === "pro") {
                role = "pro";
            } else if (plan === "enterprise") {
                role = "enterprise";
            }
        }

        /*         console.log(`VÉRIFICATION ABONNEMENT - Client: ${stripeCustomerId}`);
        console.log(
            `Plan actuel: ${plan} - Statut: ${stripeSubscription.status}`
        );
        console.log(`Nouveau rôle: ${role}`);
        console.log(
            `Prochain prélèvement: ${amountNextBilling} ${currency.toUpperCase()} le ${nextBillingDate}`
        );
 */
        const userRecord = await db
            .select()
            .from(user)
            .where(eq(user.stripeCustomerId, stripeCustomerId));

        if (!userRecord) {
            return {
                status: "error",
                message: "Utilisateur non trouvé",
            };
        }

        await db
            .update(user)
            .set({ role })
            .where(eq(user.id, userRecord[0].id));

        const existingSubscription = await db
            .select()
            .from(subscription)
            .where(eq(subscription.stripeCustomerId, stripeCustomerId));

        if (existingSubscription.length > 0) {
            await db
                .update(subscription)
                .set({
                    plan,
                    status: stripeSubscription.status,
                    cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
                    periodEnd: new Date(
                        stripeSubscription.current_period_end * 1000
                    ),
                })
                .where(eq(subscription.id, existingSubscription[0].id));
        }

        revalidatePath("/dashboard/subscription");
        return {
            status: "success",
            message: "Subscription & role updated ",
            content: {
                plan,
                role,
                status: stripeSubscription.status,
                cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
                nextBillingDate,
                amountNextBilling,
                currency: currency.toUpperCase(),
            },
        };
    } catch (error) {
        console.error("Erreur lors de la vérification de l'abonnement:", error);

        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Format de données invalide",
                errors: error.issues,
            };
        }

        return {
            status: "error",
            message: "Impossible de vérifier l'abonnement",
        };
    }
}
