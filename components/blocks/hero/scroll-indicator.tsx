"use client";

import { ChevronDown } from "lucide-react";
import { motion, Variant } from "motion/react";

interface ScrollIndicatorProps {
    itemVariants: Record<string, Variant>;
}

export const ScrollIndicator = ({ itemVariants }: ScrollIndicatorProps) => {
    return (
        <motion.div
            className="mt-16 flex justify-center"
            variants={itemVariants}
        >
            <motion.div
                className="flex flex-col items-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                    const featuresSection = document.getElementById("features");
                    if (featuresSection) {
                        featuresSection.scrollIntoView({
                            behavior: "smooth",
                        });
                    }
                }}
            >
                <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    Discover more
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="h-6 w-6 text-indigo-500" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}; 