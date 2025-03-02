"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
        <div onClick={handleSignOut} className="flex items-center cursor-pointer w-full">
            <LogOut className="h-4 w-4 mr-4" />
            <span>Sign Out</span>
        </div>
    );
}