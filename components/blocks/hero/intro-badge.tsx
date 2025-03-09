"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, Variant } from "motion/react";

interface IntroBadgeProps {
    itemVariants: Record<string, Variant>;
}

export const IntroBadge = ({ itemVariants }: IntroBadgeProps) => {
    return (
        <motion.div
            variants={itemVariants}
            className="flex justify-center mb-10"
        >
            <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm px-4 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 shadow-sm"
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span>Introducing Speetly</span>
                <Link
                    href="#features"
                    className="ml-1 inline-flex items-center gap-1 pl-2 font-medium border-l border-indigo-200 dark:border-indigo-800/60 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                    Explore
                    <ArrowRight className="h-3 w-3" />
                </Link>
            </motion.div>
        </motion.div>
    );
}; 