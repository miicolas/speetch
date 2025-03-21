import { getServerSession } from "@/lib/server-session";
import { redirect } from "next/navigation";
import { getSubscription } from "@/actions/(member)/get-subscription/action";
import {
    Zap,
    Star,
    Users,
    CreditCard,
    LifeBuoy,
    CalendarClock,
} from "lucide-react";
import SubscriptionActions from "./_subscription/subscription-actions";
import SubscriptionHistory from "./_subscription/subscription-history";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const pricingPlans = [
    {
        title: "basic",
        price: "5.99",
        priceYearly: "49.99",
        description: "Perfect for freelancers just starting out",
        features: [
            "Smart Automation & AI",
            "Ultra-flexible Payment Solution",
            "Simplified Administrative Management",
            "CRM Designed for Freelancers",
            "Client Follow-up",
        ],
        typePricing: "month",
        icon: <Zap className="h-5 w-5" />,
        color: "from-blue-500 to-indigo-600",
        popular: false,
    },
    {
        title: "pro",
        price: "9.99",
        priceYearly: "79.99",
        description: "For established freelancers with growing business",
        features: [
            "Smart Automation & AI",
            "Ultra-flexible Payment Solution",
            "Simplified Administrative Management",
            "CRM Designed for Freelancers",
            "Legal Contract Generator",
            "Tax Calculator",
            "Client Follow-up",
        ],
        typePricing: "month",
        icon: <Star className="h-5 w-5" />,
        color: "from-purple-500 to-pink-600",
        popular: true,
    },
    {
        title: "enterprise",
        price: "19.99",
        priceYearly: "149.99",
        description: "For agencies and multi-freelancer teams",
        features: [
            "Smart Automation & AI",
            "Ultra-flexible Payment Solution",
            "Simplified Administrative Management",
            "CRM Designed for Freelancers",
            "Legal Contract Generator",
            "Tax Calculator",
            "Priority Support",
            "Multiple Users",
        ],
        typePricing: "month",
        icon: <Users className="h-5 w-5" />,
        color: "from-amber-500 to-orange-600",
        popular: false,
    },
];

export default async function SubscriptionPage() {
    const session = await getServerSession();

    if (!session) {
        redirect("/sign-in");
    }

    const subscription = await getSubscription({
        stripeCustomerId: session.user.stripeCustomerId || "",
    });

    const planName = (subscription.content as { plan: string })?.plan || "";
    const status = (subscription.content as { status: string })?.status || "";
    const cancelAtPeriodEnd =
        (subscription.content as { cancelAtPeriodEnd: boolean })
            ?.cancelAtPeriodEnd || false;

    const displayStatus = cancelAtPeriodEnd ? "canceled" : status;

    const pricingCurrentPlan =
        pricingPlans.find((plan) => plan.title === planName) || pricingPlans[0];

    const periodEnd = (subscription.content as { periodEnd: string })?.periodEnd
        ? new Date((subscription.content as { periodEnd: string }).periodEnd)
        : null;

    const formattedPeriodEnd = periodEnd
        ? new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
          }).format(periodEnd)
        : null;

    return (
        <div className="container py-10 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Subscription
                </h1>
                <p className="text-muted-foreground">
                    Manage your subscription and payment methods
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Current plan</CardTitle>
                            <CardDescription>
                                Details of your current subscription
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {pricingCurrentPlan?.icon && (
                                            <div
                                                className={`p-1.5 rounded-full bg-gradient-to-br ${pricingCurrentPlan.color} text-white`}
                                            >
                                                {pricingCurrentPlan.icon}
                                            </div>
                                        )}
                                        <span className="font-medium text-lg capitalize">
                                            {planName || "No plan"}
                                        </span>
                                        <Badge
                                            variant={
                                                displayStatus === "active"
                                                    ? "success"
                                                    : displayStatus ===
                                                        "canceled"
                                                      ? "warning"
                                                      : "outline"
                                            }
                                        >
                                            {displayStatus === "active"
                                                ? "Active"
                                                : displayStatus === "canceled"
                                                  ? "Canceled"
                                                  : displayStatus}
                                        </Badge>
                                    </div>

                                    {periodEnd && (
                                        <div className="flex items-center text-sm text-muted-foreground mt-2 gap-1.5">
                                            <CalendarClock className="h-4 w-4" />
                                            {displayStatus === "canceled"
                                                ? `Your subscription will end on ${formattedPeriodEnd}`
                                                : `Next renewal on ${formattedPeriodEnd}`}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap mt-4 gap-6">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                {pricingCurrentPlan?.price}€ per
                                                month
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <LifeBuoy className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                Priority support
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <SubscriptionActions
                                    currentPlan={planName}
                                    status={displayStatus}
                                    userId={session.user.id}
                                    stripeCustomerId={
                                        session.user.stripeCustomerId || ""
                                    }
                                />
                            </div>

                            {pricingCurrentPlan?.features && (
                                <div className="mt-6 pt-6 border-t">
                                    <h3 className="text-sm font-medium mb-3">
                                        Included features
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {pricingCurrentPlan.features.map(
                                            (feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="h-4 w-4 text-green-500"
                                                    >
                                                        <path d="M5 12l5 5l10 -10"></path>
                                                    </svg>
                                                    {feature}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <SubscriptionHistory
                        userId={session.user.id}
                        stripeCustomerId={session.user.stripeCustomerId || ""}
                    />
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        All available plans
                    </h2>
                    <div className="space-y-6">
                        {pricingPlans.map((plan) => (
                            <div
                                key={plan.title}
                                className={`p-1 rounded-xl ${plan.title === planName ? `bg-gradient-to-r ${plan.color}` : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300"}`}
                            >
                                <Card className="bg-white h-full">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`p-1.5 rounded-full bg-gradient-to-br ${plan.color} text-white`}
                                                >
                                                    {plan.icon}
                                                </div>
                                                <CardTitle className="capitalize">
                                                    {plan.title}
                                                </CardTitle>
                                            </div>
                                            {plan.title === planName && (
                                                <Badge variant="success">
                                                    Current
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription className="mt-2">
                                            {plan.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-baseline mb-4">
                                            <span className="text-2xl font-bold">
                                                {plan.price}€
                                            </span>
                                            <span className="text-muted-foreground ml-1.5">
                                                /month
                                            </span>
                                        </div>

                                        <ul className="space-y-2 text-sm">
                                            {plan.features
                                                .slice(0, 4)
                                                .map((feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start gap-2"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            className="h-4 w-4 text-green-500 mt-0.5"
                                                        >
                                                            <path d="M5 12l5 5l10 -10"></path>
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            {plan.features.length > 4 && (
                                                <li className="text-muted-foreground text-sm ml-6">
                                                    + {plan.features.length - 4}{" "}
                                                    other features
                                                </li>
                                            )}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
