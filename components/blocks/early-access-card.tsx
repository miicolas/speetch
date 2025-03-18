"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

export default function EarlyAccessCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50" />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold">Early Access</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Free access for the first to sign up
                        </p>
                    </div>

                </div>

                <div className="mb-8">
                    <div className="flex items-baseline">
                        <span className="text-5xl font-bold">0€</span>
                        <span className="ml-2 text-neutral-600 dark:text-neutral-400">/month</span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        for life
                    </p>
                </div>

                <ul className="space-y-4 mb-8">
                    {[
                        "Smart Automation & AI",
                        "Ultra-flexible Payment Solution",
                        "Simplified Administrative Management",
                        "CRM Designed for Freelancers",
                        "Client Follow-up",
                        "Priority access to new features",
                        "Dedicated support",
                    ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <CheckIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="absolute -top-6 -right-6">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full transform rotate-12">
                        Limited offer
                    </div>
                </div>
            </div>
        </motion.div>
    );
} 