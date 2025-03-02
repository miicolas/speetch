import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import { user, session, account, verification } from "@/db/auth-schema";

// Récupérer l'URL de base depuis les variables d'environnement ou utiliser une valeur par défaut
const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://votre-domaine-production.com';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
        enabledProviders: ["email"],
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID! as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
            callbackURL: `${BASE_URL}/api/auth/callback/github`,
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
    trustedOrigins: [
        "dev-speetly.nicolas-becharat.com",
        "dev-speetly.nicolas-becharat.com/api/auth",
        "speetly.nicolas-becharat.com",
        "speetly.nicolas-becharat.com/api/auth",
    ],
});
