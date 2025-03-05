"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { NumberTicker } from "../ui/number-ticker";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Session } from "@/lib/types/auth-type";

const pricingCards = [
    {
        title: "Basic",
        price: "5.99",
        description: "For personal use",
        features: [
            "Smart Automation & AI",
            "Ultra-flexible Payment Solution",
            "Simplified Administrative Management",
            "CRM Designed for Freelancers",
            "Client Follow-up",
        ],
        typePricing: "month",
    },
    {
        title: "Pro",
        price: "9.99",
        description: "For professional use",
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
    },
    {
        title: "Enterprise",
        price: "19.99",
        description: "For enterprise use",
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
    },
];

export default function Pricing() {
    const [selectedPricing, setSelectedPricing] = useState("monthly");
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await authClient.getSession();
            if (data) setSession(data as Session);
        };
        fetchSession();
    }, []);

    return (
        <div className="flex flex-col gap-8 py-12">
            <h2 className="text-4xl font-bold text-center mt-10">
                Simple Pricing for Simple Solutions
            </h2>
            <p className="text-center text-neutral-500">
                Choose the plan that&apos;s right for you. No hidden fees, no
                surprises.
            </p>
            <div className="flex flex-row gap-4 justify-center items-center border border-neutral-200 w-fit mx-auto rounded-lg p-2">
                <Button
                    variant="outline"
                    onClick={() => setSelectedPricing("yearly")}
                    className={
                        selectedPricing === "yearly" ? "bg-neutral-200" : ""
                    }
                >
                    Yearly
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setSelectedPricing("monthly")}
                    className={
                        selectedPricing === "monthly" ? "bg-neutral-200" : ""
                    }
                >
                    Monthly
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
                {pricingCards.map((card) => (
                    <PricingCard
                        key={card.title}
                        {...card}
                        selectedPricing={selectedPricing}
                        session={session}
                    />
                ))}
            </div>
        </div>
    );
}

const PricingCard = ({
    title,
    price,
    description,
    features,
    selectedPricing,
    session,
}: {
    title: string;
    price: string;
    description: string;
    features: string[];
    selectedPricing: string;
    session: Session | null;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const titlePlan = title.toLowerCase();

    const handleSubscription = async () => {
        setIsLoading(true);
        try {
            if (!session) {
                toast.info("Connexion requise", {
                    description: "Vous devez être connecté pour vous abonner",
                });
                window.location.href = "/sign-in";
                setIsLoading(false);
                return;
            }

            console.log("Envoi de la demande d'abonnement:", {
                titlePlan,
                selectedPricing,
            });

            const response = await fetch("/api/stripe/create-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    titlePlan,
                    billingCycle: selectedPricing,
                }),
            });

            const data = await response.json();
            console.log("Réponse de l'API:", data);

            if (data.status === "success" && data.url) {
                console.log("Redirection vers:", data.url);
                window.location.href = data.url;
            } else if (data.redirectTo) {
                console.log("Redirection vers:", data.redirectTo);
                window.location.href = data.redirectTo;
            } else {
                toast.error("Erreur lors de la création de l'abonnement", {
                    description: data.error || "Veuillez réessayer plus tard.",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Erreur de connexion", {
                description: "Veuillez réessayer plus tard.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={`flex flex-col p-4 border border-neutral-200 min-h-[500px] w-full md:w-[300px] gap-4 bg-neutral-50 justify-between max-w-md ${
                title === "Basic" ? "min-h-[700px]" : ""
            }`}
        >
            <div className="space-y-4">
                <h3 className="text-lg font-bold">{title}</h3>
                <div className="h-16 relative">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={selectedPricing}
                            className="text-2xl font-bold absolute"
                            transition={{ duration: 0.3 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <span className="text-4xl">
                                {price === "0" ? (
                                    "0"
                                ) : selectedPricing === "yearly" ? (
                                    <NumberTicker value={Number(price) * 10} />
                                ) : (
                                    <NumberTicker value={Number(price)} />
                                )}
                            </span>
                            <span className="text-sm text-neutral-500">
                                /
                                {selectedPricing === "yearly"
                                    ? "year"
                                    : "month"}
                            </span>
                        </motion.p>
                    </AnimatePresence>
                </div>
                <p className="text-sm text-neutral-500">{description}</p>
                <Separator />
                <ul className="list-none space-y-2">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                            <CheckIcon className="w-4 h-4 text-green-500" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
            <Button
                className={`mt-auto bg-indigo-500 hover:bg-indigo-600 transition-all duration-400`}
                onClick={handleSubscription}
                disabled={isLoading}
            >
                {isLoading ? "Chargement..." : "S'abonner"}
            </Button>
        </div>
    );
};
