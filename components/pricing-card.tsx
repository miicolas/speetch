"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Session } from "@/lib/types/auth-type";
import { useInView } from "motion/react";

export default function PricingCard({
    title,
    price,
    priceYearly,
    description,
    features,
    selectedPricing,
    session,
    icon,
    color,
    popular,
}: {
    title: string;
    price: string;
    priceYearly: string;
    description: string;
    features: string[];
    selectedPricing: string;
    session: Session | null;
    icon: React.ReactNode;
    color: string;
    popular: boolean;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const titlePlan = title.toLowerCase();
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });

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

            const { error } = await authClient.subscription.upgrade({
                plan: titlePlan,
                annual: selectedPricing === "yearly",
                successUrl: "/api/auth/set-member-role?plan=" + titlePlan,
                cancelUrl: "/pricing",
            });
            if (error) {
                alert(error.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Erreur de connexion", {
                description: "Veuillez réessayer plus tard.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className={cn(
                "flex flex-col p-6 border transition-all duration-300 h-full",
                popular
                    ? "border-indigo-200 dark:border-indigo-800 shadow-lg relative"
                    : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900",
                isHovered && "shadow-xl transform -translate-y-1"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
        >
            {popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <motion.div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Sparkles className="h-3 w-3 inline-block mr-1" />
                        Most Popular
                    </motion.div>
                </div>
            )}

            <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}
                        >
                            {icon}
                        </div>
                        <h3 className="text-xl font-bold">{title}</h3>
                    </div>
                </div>

                <div className="h-20 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedPricing}
                            className="absolute"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-baseline">
                                <span className="text-4xl font-bold">
                                    {selectedPricing === "yearly" ? (
                                        <NumberTicker
                                            value={Number(priceYearly)}
                                        />
                                    ) : (
                                        <NumberTicker value={Number(price)} />
                                    )}
                                </span>
                                <span className="text-sm text-neutral-500 ml-1">
                                    /
                                    {selectedPricing === "yearly"
                                        ? "year"
                                        : "month"}
                                </span>
                            </div>
                            {selectedPricing === "yearly" && (
                                <motion.div
                                    className="text-xs text-green-600 mt-1 flex items-center"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <CheckIcon className="h-3 w-3 mr-1" />
                                    Save $
                                    {(
                                        Number(price) * 12 -
                                        Number(priceYearly)
                                    ).toFixed(2)}{" "}
                                    per year
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {description}
                </p>

                <Separator className="my-4" />

                <ul className="space-y-3 flex-1">
                    {features.map((feature, index) => (
                        <motion.li
                            key={feature}
                            className="flex items-start gap-2 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -10 }
                            }
                            transition={{
                                duration: 0.3,
                                delay: 0.1 + index * 0.05,
                            }}
                        >
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            <motion.div
                className="mt-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
                <Button
                    className={cn(
                        "w-full rounded-xl py-6 text-white transition-all duration-300 flex items-center justify-center gap-2",
                        popular
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                            : "bg-neutral-900 hover:bg-neutral-800 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                    )}
                    onClick={handleSubscription}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            Chargement...
                        </div>
                    ) : (
                        <>
                            S'abonner
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </motion.div>
        </motion.div>
    );
}
