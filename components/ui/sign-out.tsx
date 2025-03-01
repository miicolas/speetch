"use client";

import { Button } from "./button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOut() {
    const router = useRouter();
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };
    return (
        <Button onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}