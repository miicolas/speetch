import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, Plus } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-900">
            <div className="max-w-md border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800 relative">
                <Plus
                    strokeWidth={1}
                    className="text-ali absolute -left-5 -top-5 h-10 w-10 z-10 text-neutral-900 animate-pulse"
                />
                <Plus
                    strokeWidth={1}
                    className="text-ali absolute -bottom-5 -left-5 h-10 w-10 z-10 text-neutral-900 animate-pulse"
                />
                <Plus
                    strokeWidth={1}
                    className="text-ali absolute -right-5 -top-5 h-10 w-10 z-10 text-neutral-900 animate-pulse"
                />
                <Plus
                    strokeWidth={1}
                    className="text-ali absolute -bottom-5 -right-5 h-10 w-10 z-10 text-neutral-900 animate-pulse"
                />
                <div className="mb-6 flex items-center justify-center">
                    <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                        <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
                    Unauthorized
                </h1>

                <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
                    You must be logged in to access this page. Please log in to
                    continue.
                </p>

                <div className="flex flex-col gap-4">
                    <Button asChild className="w-full">
                        <Link href="/sign-in">Login</Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>

                    <Button asChild variant="ghost" className="w-full">
                        <Link href="/">Home</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
