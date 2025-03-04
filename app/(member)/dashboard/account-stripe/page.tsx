import { getServerSession } from "@/lib/server-session";
import CreateStripeAccountButton from "./(...stripe-account)/create-stripe-account-button";
import { getStripeAccount } from "@/actions/(stripe)/get-stripe/action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function OnboardingStripe() {
    const session = await getServerSession();

    const stripeAccount = await getStripeAccount({ userId: session?.user.id });

    const hasValidAccount =
        stripeAccount.status === "success" &&
        Array.isArray(stripeAccount.content) &&
        stripeAccount.content.length > 0;

    const accountContent = hasValidAccount
        ? (stripeAccount.content as Array<{ stripeAccountId: string }>)
        : [];

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">Onboarding Stripe</h2>
            {hasValidAccount && accountContent.length > 0 && accountContent[0].stripeAccountId ? (
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        defaultValue={`https://connect.stripe.com/app/express#${accountContent[0].stripeAccountId}`}
                        readOnly
                    />
                    <Button asChild>
                        <Link href={`https://connect.stripe.com/app/express#${accountContent[0].stripeAccountId}`}>
                            Open
                        </Link>
                    </Button>
                </div>
            ) : (
                <CreateStripeAccountButton
                    userEmail={session?.user.email}
                    userName={session?.user.name}
                />
            )}
        </div>
    );
}
