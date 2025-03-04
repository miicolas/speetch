import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import { user, session, account, verification } from "@/db/auth-schema";
import { admin } from "better-auth/plugins"

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
    plugins: [admin()],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID! as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
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
