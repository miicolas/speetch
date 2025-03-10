"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CallToAction() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });
    const [isHovered, setIsHovered] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            ref={containerRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative mx-auto max-w-5xl px-4 py-16 sm:py-6 lg:py-28 overflow-hidden"
        >
            <div className="relative bg-white dark:bg-neutral-900 p-8 sm:p-10 lg:p-16 border border-neutral-200 dark:border-neutral-800 shadow-xl z-10 ">
                <Plus
                    strokeWidth={1}
                    className="text-ali absolute -left-5 -top-5 h-10 w-10 z-10 text-indigo-500 animate-pulse"
                />
                <Plus
                    strokeWidth={1}
                    className="text-ali absolute -bottom-5 -left-5 h-10 w-10 z-10 text-indigo-500 animate-pulse"
                />
                <Plus
                    strokeWidth={1}
                    className="text-ali absolute -right-5 -top-5 h-10 w-10 z-10 text-indigo-500 animate-pulse"
                />
                <Plus
                    strokeWidth={1}
                    className="text-ali absolute -bottom-5 -right-5 h-10 w-10 z-10 text-indigo-500 animate-pulse"
                />
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        variants={itemVariants}
                        className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full px-4 py-1 mb-4 p-4"
                    >
                        <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            Simplify your administrative tasks
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4"
                    >
                        Ready to{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                            start your adventure
                        </span>{" "}
                        ?
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mb-8"
                    >
                        Join thousands of freelancers who have already
                        simplified their administrative tasks and focus on what
                        they really love.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            <Button
                                className={cn(
                                    "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-6 rounded-xl text-base sm:text-lg group relative overflow-hidden",
                                    isHovered
                                        ? "shadow-lg shadow-indigo-500/20"
                                        : ""
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Start your adventure
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>

                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-20"
                                    initial={{ left: "-100%" }}
                                    animate={
                                        isHovered
                                            ? { left: "100%" }
                                            : { left: "-100%" }
                                    }
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    }}
                                />
                            </Button>
                        </motion.div>

                        <Button
                            variant="outline"
                            className="border-neutral-300 dark:border-neutral-700 px-6 py-6 rounded-xl text-base sm:text-lg group"
                        >
                            <span className="flex items-center gap-1">
                                Call me
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
