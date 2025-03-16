import { getServerSession } from "@/lib/server-session";
import { StatsCards } from "./(...dashboard)/stats-cards";
import { RecentProjects } from "./(...dashboard)/recent-projects";
import { ProjectCalendar } from "./(...dashboard)/project-calendar";
import { Projects } from "@/models/projects";
import { Payments } from "@/models/payment";

export default async function Dashboard() {
    const session = await getServerSession();
    const projects = await Projects.getProjects(session.user.id);
    const payments = await Payments.getPayments(session.user.id);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    Bonjour, {session.user.name}
                </p>
            </div>

            <StatsCards projects={projects} payments={payments} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-5">
                    <RecentProjects projects={projects} />
                </div>
                <div className="col-span-2">
                    <ProjectCalendar projects={projects} />
                </div>
            </div>
        </div>
    );
}
