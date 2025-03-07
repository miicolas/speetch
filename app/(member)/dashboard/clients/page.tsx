import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/server-session";
import Link from "next/link";
import { columns } from "./(...clients)/table-client/columns";
import { DataTable } from "./(...clients)/table-client/data-table";
import { getProjects } from "@/actions/(member)/get-projects/action";
import { Client } from "@/lib/types/client-type";
export default async function ClientsProject() {
    const session = await getServerSession();

    const data = await getClients({ userId: session?.user.id });



    return (
        <div className="flex flex-col py-12 gap-4">
            <div className="flex justify-between items-center">
                <h1>Projects</h1>
                <Button asChild>
                    <Link href="/dashboard/client/create">
                        Create Project
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data.content as Client[]} />
        </div>
    );
}
