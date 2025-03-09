import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import { user, session, account, verification, subscription } from "@/db/auth-schema";
import { admin } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            account,
            verification,
            subscription,
        },
    }),
    plugins: [
        admin(),
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "basic", 
                        priceId: "price_1QzDtuE8GWE0lB6bnk1I9SX3", 
                        annualDiscountPriceId: "price_1R01XkE8GWE0lB6bOnqblZMR",
                    },
                    {
                        name: "pro",
                        priceId: "price_1QzDu9E8GWE0lB6bWNtGQmcQ",
                        annualDiscountPriceId: "price_1R0mhXE8GWE0lB6buhSYsgqR",
                    },
                    {
                        name: "enterprise",
                        priceId: "price_1QzDuJE8GWE0lB6bQFFsmQ5b",
                        annualDiscountPriceId: "price_1R0miAE8GWE0lB6bfK3oOJpK",
                    },
                ]
            }
             
        }),
        
    ],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID! as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
    trustedOrigins: [
        "dev.speetly.com",
        "dev.speetly.com/api/auth",
        "speetly.com",
        "speetly.com/api/auth",
    ],
});
