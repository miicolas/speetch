import Pricing from "@/components/blocks/pricing";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PricingPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    console.log(session?.user.role); // entreprise

    if (
        session?.user?.role == "basic" ||
        session?.user?.role == "pro" ||
        session?.user?.role == "enterprise" ||
        session?.user?.role == "admin"
    ) {
        redirect("/dashboard");
    }

    return <Pricing />;
}
