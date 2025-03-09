import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "Aucun ID utilisateur fourni" },
                { status: 400 }
            );
        }

        const customId = await db
            .select({ stripeCustomerId: user.stripeCustomerId })
            .from(user)
            .where(eq(user.id, userId))
            .execute();


        if (!customId) {
            return NextResponse.json(
                { error: "Aucun ID Stripe trouvé pour cet utilisateur" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { stripeCustomerId: customId },
            { status: 200 }
        );
    } catch (error) {
        console.error(error, "error");
        return NextResponse.json(
            { error: "Erreur lors de la récupération de l'ID Stripe" },
            { status: 500 }
        );
    }
}
