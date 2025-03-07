import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/server-session";
import Link from "next/link";
import { columns } from "./(...projects)/table-project/columns";
import { DataTable } from "./(...projects)/table-project/data-table";
import { getProjects } from "@/actions/(member)/get-projects/action";
import { Project } from "@/lib/types/project-type";
export default async function ProjectsPage() {
    const session = await getServerSession();

    const data = await getProjects({ userId: session?.user.id });

    console.log(data);

    return (
        <div className="flex flex-col py-12 gap-4">
            <div className="flex justify-between items-center">
                <h1>Projects</h1>
                <Button asChild>
                    <Link href="/dashboard/projects/create">
                        Create Project
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data.content as Project[]} />
        </div>
    );
}
