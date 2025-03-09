import { CreateClientForm } from "@/components/forms/client-create-form";

export default async function CreateClientPage() {
    return (
        <div className="flex flex-col py-12 gap-4">
            <CreateClientForm />
        </div>
    );
}
