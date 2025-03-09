"use client";

import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { Cover } from "../../ui/cover";
import { motion, Variant } from "motion/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface HeroContentProps {
    itemVariants: Record<string, Variant>;
}

export const HeroContent = ({ itemVariants }: HeroContentProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
        >
            <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            >
                <span className="inline-block mb-2">
                    Everything passes through
                </span>{" "}
                <div className="flex items-center justify-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400">
                        your
                    </span>{" "}
                    <div className="inline-block lg:inline">
                        <div className="group inline-block overflow-hidden">
                            <Cover className="overflow-hidden">
                                <FlipWords
                                    className="px-3 py-1 text-4xl sm:text-5xl md:text-6xl font-bold group-hover:text-white"
                                    words={[
                                        "business",
                                        "projects",
                                        "clients",
                                        "growth",
                                    ]}
                                />
                            </Cover>
                        </div>
                    </div>
                </div>
            </motion.h1>

            <motion.p
                variants={itemVariants}
                className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto lg:mx-0"
            >
                Speetly is a platform that helps you create and
                manage your clients, projects, and finances with
                ease. Simplify your workflow and focus on what
                matters most.
            </motion.p>

            <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
            >
                <Link href="/dashboard">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <Button
                            size="lg"
                            className={cn(
                                "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg font-medium shadow-md group relative overflow-hidden",
                                isHovered
                                    ? "shadow-lg shadow-indigo-500/20"
                                    : ""
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Sparkles className="h-5 w-5" />
                                Join Waitlist
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
                </Link>

                <Link href="https://cal.com/" target="_blank">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-indigo-200 dark:border-indigo-800/60 hover:border-indigo-500 dark:hover:border-indigo-600 px-8 py-6 rounded-xl text-lg font-medium group"
                        >
                            <span className="flex items-center gap-2">
                                Book a Demo
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </Button>
                    </motion.div>
                </Link>
            </motion.div>

            <UserAvatars itemVariants={itemVariants} />
        </motion.div>
    );
};

interface UserAvatarsProps {
    itemVariants: Record<string, Variant>;
}

const UserAvatars = ({ itemVariants }: UserAvatarsProps) => {
    return (
        <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center lg:justify-start gap-6"
        >
            <div className="flex -space-x-2">
                {[
                    "https://randomuser.me/api/portraits/women/12.jpg",
                    "https://randomuser.me/api/portraits/men/15.jpg",
                    "https://randomuser.me/api/portraits/women/3.jpg",
                    "https://randomuser.me/api/portraits/men/7.jpg",
                ].map((src, index) => (
                    <div
                        key={index}
                        className="relative inline-block"
                    >
                        <motion.img
                            src={src}
                            alt={`User ${index + 1}`}
                            className="h-8 w-8 rounded-full border-2 border-white dark:border-neutral-900"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.1 * index + 0.8,
                            }}
                        />
                    </div>
                ))}
                <motion.div
                    className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-medium text-indigo-600 dark:text-indigo-400 border-2 border-white dark:border-neutral-900"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    +5k
                </motion.div>
            </div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Joined by 5,000+ freelancers
            </span>
        </motion.div>
    );
}; 