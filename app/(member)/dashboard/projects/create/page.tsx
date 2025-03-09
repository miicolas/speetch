import { CreateProjectForm } from "@/components/forms/project-create-form";
import { getClients } from "@/actions/(member)/get-clients/action";
import { getServerSession } from "@/lib/server-session";
import { Client } from "@/lib/types/client-type";

export default async function CreateProjectPage() {
    const session = await getServerSession();

    const getClient = await getClients({ userId: session?.user.id });

    return (
        <div className="flex flex-col py-12 gap-4">
            <CreateProjectForm clients={getClient.content as Client[]} />
        </div>
    );
}
