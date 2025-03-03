import { getServerSession } from "@/lib/server-session";
import CreateStripeAccountButton from "./(...create-stripe-account-button.tsx)/create-stripe-account-button";
import db from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function OnboardingStripe() {
    const session = await getServerSession();

    const stripeAccount = await db
        .select({ stripeAccountId: user.stripeAccountId })
        .from(user)
        .where(eq(user.id, session?.user.id));

    if (stripeAccount[0].stripeAccountId) {
        redirect("/dashboard");
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">Onboarding Stripe</h2>
            <CreateStripeAccountButton
                userEmail={session?.user.email}
                userName={session?.user.name}
            />
        </div>
    );
}
