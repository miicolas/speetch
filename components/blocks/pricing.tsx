"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Star, Users } from "lucide-react";
import PricingCard from "@/components/pricing-card";
import { authClient } from "@/lib/auth-client";
import { Session } from "@/lib/types/auth-type";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const pricingCards = [
    {
        title: "Basic",
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
        title: "Pro",
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
        title: "Enterprise",
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

export default function Pricing() {
    const [selectedPricing, setSelectedPricing] = useState("monthly");
    const [session, setSession] = useState<Session | null>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await authClient.getSession();
            if (data) setSession(data as Session);
        };
        fetchSession();
    }, []);

    return (
        <section
            className="flex flex-col gap-8 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-24"
            ref={containerRef}
        >
            <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5 }}
            >
                <motion.span
                    className="inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                        isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Pricing Plans
                </motion.span>
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Simple Pricing for{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                        Powerful Tools
                    </span>
                </motion.h2>
                <motion.p
                    className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Choose the plan that's right for you.
                </motion.p>
            </motion.div>

            <motion.div
                className="flex flex-row gap-2 justify-center items-center border border-neutral-200 dark:border-neutral-800 w-fit mx-auto rounded-full p-1.5 bg-white dark:bg-neutral-900 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <PricingToggle
                    selectedPricing={selectedPricing}
                    setSelectedPricing={setSelectedPricing}
                />

                
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mx-auto w-full mt-8">
                {pricingCards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                        <PricingCard
                            {...card}
                            selectedPricing={selectedPricing}
                            session={session}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <p className="text-sm text-neutral-500 flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    All plans include secure payment processing and 24/7 support
                </p>
            </motion.div>
        </section>
    );
}

const PricingToggle = ({
    selectedPricing,
    setSelectedPricing,
}: {
    selectedPricing: string;
    setSelectedPricing: (pricing: string) => void;
}) => {
    return (
        <div className="relative flex items-center">
            <Tabs
                defaultValue={selectedPricing}
                onValueChange={setSelectedPricing}
            >
                <TabsList className="rounded-full" aria-label="Pricing Plans">
                    <TabsTrigger
                        value="monthly"
                        className="rounded-full data-[state=active]:text-white "
                    >
                        Monthly
                    </TabsTrigger>
                    <TabsTrigger
                        value="yearly"
                        className="rounded-full data-[state=active]:text-white "
                    >
                        Yearly
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};
