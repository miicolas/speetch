import { getServerSession } from "@/lib/server-session";
import { StatsCards } from "./_dashboard/stats-cards";
import { RecentProjects } from "./_dashboard/recent-projects";
import { ProjectCalendar } from "./_dashboard/project-calendar";
import { Projects } from "@/models/projects";
import { Payments } from "@/models/payment";

export default async function Dashboard() {
    const session = await getServerSession();
    const projects = await Projects.getProjects(session.user.id);
    const payments = await Payments.getPayments(session.user.id);

    return (
        <div className="container space-y-8 p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Bonjour, {session.user.name}
                </p>
            </div>

            <StatsCards projects={projects} payments={payments} />

            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-4">
                    <RecentProjects projects={projects} />
                </div>
                <div className="lg:col-span-4 space-y-4">
                    <ProjectCalendar projects={projects} />
                </div>
            </div>
        </div>
    );
}
