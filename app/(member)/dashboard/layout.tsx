import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { getProtectedServerSession } from "@/lib/server-session";
import { Session } from "@/lib/types/auth-type";

export default async function MemberDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getProtectedServerSession(["member", "admin"]);

    return (
        <SidebarProvider>
            <AppSidebar session={session as Session} />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
