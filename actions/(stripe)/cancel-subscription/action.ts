"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/types/form-type";
import Stripe from "stripe";
import { revalidatePath } from "next/cache";
import { User } from "@/models/user";
import { authClient } from "@/lib/auth-client";

// Créer une instance Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-02-24.acacia",
});

const bodySchema = z.object({
    stripeCustomerId: z.string(),
    userId: z.string(),
});

export async function cancelSubscription(
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

        const { stripeCustomerId, userId } = validatedBody.data;

        // 1. Récupérer les abonnements actifs pour ce client
        const subscriptions = await stripe.subscriptions.list({
            customer: stripeCustomerId,
            status: "active",
        });

        if (subscriptions.data.length === 0) {
            return {
                status: "error",
                message: "Aucun abonnement actif trouvé",
            };
        }

        const subscription = await stripe.subscriptions.update(
            subscriptions.data[0].id,
            {
                cancel_at_period_end: true,
            }
        );

        const { error } = await authClient.subscription.cancel({
            returnUrl: "/account",
        });

        if (error) {
            console.error(error);
        }

        revalidatePath("/dashboard/subscription");

        return {
            status: "success",
            message: "Abonnement annulé avec succès",
            content: { id: subscription.id },
        };
    } catch (error) {
        console.error("Erreur lors de l'annulation de l'abonnement:", error);

        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Format de données invalide",
                errors: error.issues,
            };
        }

        return {
            status: "error",
            message: "Impossible d'annuler l'abonnement",
        };
    }
}
