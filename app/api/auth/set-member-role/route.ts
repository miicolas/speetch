import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { user, session } from "@/db/auth-schema";

export async function GET(req: NextRequest) {
    try {
        const cookie = req.cookies.get("better-auth.session_token");
        const session_token = cookie?.value;

        if (!session_token) {
            console.error(
                "Aucune session token fournie pour définir le rôle member"
            );
            return NextResponse.redirect(new URL("/dashboard/create-account-stripe", req.url));
        }

        const sliceSessionToken = session_token.slice(0, 32);

        const sessionResult = await db
            .select()
            .from(session)
            .where(eq(session.token, sliceSessionToken));

        if (!sessionResult) {
            console.error("Aucune session trouvée pour définir le rôle member");
            return NextResponse.redirect(new URL("/dashboard/create-account-stripe", req.url));
        }

        const sessionUserId = sessionResult[0];


        if (!sessionUserId) {
            console.error("Aucune session trouvée pour définir le rôle member");
            return NextResponse.redirect(new URL("/dashboard/create-account-stripe", req.url));
        }

        const userResult = await db
            .select()
            .from(user)
            .where(eq(user.id, sessionUserId.userId));

        if (!userResult) {
            console.error("Aucun userId fourni pour définir le rôle member");
            return NextResponse.redirect(new URL("/dashboard/create-account-stripe", req.url));
        }

        const userId = userResult[0].id;

        if (!userId) {
            console.error("Aucun userId fourni pour définir le rôle member");
            return NextResponse.redirect(new URL("/dashboard/create-account-stripe", req.url));
        }

        await db
            .update(user)
            .set({ role: "member" })
            .where(eq(user.id, userId));


        return NextResponse.redirect(new URL("/dashboard/create-account-stripe", req.url));
    } catch (error) {
        console.error("Erreur lors de l'attribution du rôle:", error);
        return NextResponse.redirect(new URL("/dashboard/create-account-stripe", req.url));
    }
}
