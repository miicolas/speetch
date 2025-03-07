import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { getProtectedServerSession } from "@/lib/server-session";
import { Session } from "@/lib/types/auth-type";
import { eq } from "drizzle-orm";
import { user } from "@/db/auth-schema";
import db from "@/db";
import AlertStripeAccount from "@/components/blocks/alert-stripe-account";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default async function MemberDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getProtectedServerSession(["member", "admin"]);

    const stripeAccount = await db
        .select({ stripeAccountId: user.stripeAccountId })
        .from(user)
        .where(eq(user.id, session?.user.id));

    return (
        <NuqsAdapter>
            <SidebarProvider>
                <AppSidebar session={session as Session} />
                <main className="w-full px-4">
                <div className="flex gap-0.5">
                    <SidebarTrigger />
                    {stripeAccount[0].stripeAccountId ? (
                        <></>
                    ) : (
                        <AlertStripeAccount />
                    )}
                </div>
                
                {children}
            </main>
        </SidebarProvider>
        </NuqsAdapter>
    );
}
