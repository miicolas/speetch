import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/server-session";
import Link from "next/link";
import { columns } from "./_clients/table-client/columns";
import { DataTable } from "./_clients/table-client/data-table";
import { getClients } from "@/actions/(member)/get-clients/action";
import { Client } from "@/lib/types/client-type";
export default async function ClientsProject() {
    const session = await getServerSession();

    const data = await getClients({ userId: session?.user.id });

    return (
        <div className="flex flex-col py-12 gap-4">
            <div className="flex justify-between items-center">
                <h1>Clients</h1>
                <Button asChild>
                    <Link href="/dashboard/clients/create">
                        Create Client
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data.content as Client[]} />
        </div>
    );
}
