import { getSession } from "@/lib/session";
import { unauthorized } from "next/navigation";
import SignOut from "@/components/ui/sign-out";
export default async function Dashboard() {
    const session = await getSession();

    if (!session) {
        unauthorized();
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {session ? (
                <div>
                    <p>
                        Connecté en tant que :{" "}
                        {session.user?.name || session.user?.email}
                    </p>
                </div>
            ) : (
                <p>Non connecté</p>
            )}
            <SignOut />
        </div>
    );
}
