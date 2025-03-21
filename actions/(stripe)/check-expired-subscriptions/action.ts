"use server";

import { FormResponse } from "@/lib/types/form-type";
import db from "@/db";
import { subscription, user } from "@/db/auth-schema";
import { and, eq, inArray, lt, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const bodySchema = z.object({
    userId: z.string(),
});

/**
 * Vérifie si l'abonnement d'un utilisateur spécifique est expiré et met à jour son rôle
 * Cette fonction peut être appelée manuellement ou par un cron job
 */
export async function checkExpiredSubscriptions(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Format de données invalide",
                errors: validatedBody.error.issues,
            };
        }

        const { userId } = validatedBody.data;
        console.log(`Vérification de l'abonnement pour l'utilisateur: ${userId}`);

        // Date actuelle
        const now = new Date();
        
        const userRecord = await db
            .select({
                id: user.id,
                email: user.email,
                role: user.role,
                stripeCustomerId: user.stripeCustomerId,
            })
            .from(user)
            .where(eq(user.id, userId))
            .execute();

        if (userRecord.length === 0) {
            return {
                status: "error",
                message: "Utilisateur non trouvé",
            };
        }

        const currentUser = userRecord[0];
        
        if (!currentUser.stripeCustomerId) {
            return {
                status: "success",
                message: "L'utilisateur n'a pas d'ID client Stripe",
                content: {
                    hasExpired: false,
                    userInfo: currentUser,
                },
            };
        }

        const userSubscription = await db
            .select()
            .from(subscription)
            .where(eq(subscription.stripeCustomerId, currentUser.stripeCustomerId))
            .execute();

        if (userSubscription.length === 0) {
            return {
                status: "success",
                message: "Aucun abonnement trouvé pour cet utilisateur",
                content: {
                    hasExpired: false,
                    userInfo: currentUser,
                },
            };
        }

        const sub = userSubscription[0];
        
        // 3. Vérifier si l'abonnement est expiré
        const isExpired = sub.periodEnd && new Date(sub.periodEnd) < now && sub.status !== "canceled";
        
        // 4. Si expiré, mettre à jour le rôle
        if (isExpired) {
            console.log(`Abonnement expiré pour ${currentUser.email} (expire le ${sub.periodEnd})`);
            
            // Mettre à jour le rôle de l'utilisateur à FREE
            await db
                .update(user)
                .set({ role: "FREE" })
                .where(eq(user.id, userId));
                
            // Mettre à jour le statut de l'abonnement
            await db
                .update(subscription)
                .set({ status: "expired" })
                .where(eq(subscription.id, sub.id));
                
            // Revalider les pages concernées
            revalidatePath("/dashboard/subscription");
            
            return {
                status: "success",
                message: "Abonnement expiré, rôle mis à jour en FREE",
                content: {
                    hasExpired: true,
                    userInfo: {
                        ...currentUser,
                        role: "FREE",
                    },
                    subscription: {
                        ...sub,
                        status: "expired",
                    },
                },
            };
        }
        
        return {
            status: "success",
            message: "L'abonnement est toujours valide",
            content: {
                hasExpired: false,
                userInfo: currentUser,
                subscription: sub,
            },
        };
    } catch (error) {
        console.error("Erreur lors de la vérification de l'abonnement:", error);
        
        return {
            status: "error",
            message: "Impossible de vérifier l'abonnement",
        };
    }
} 