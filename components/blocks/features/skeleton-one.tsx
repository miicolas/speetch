"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, ShieldCheck, BellRing, CheckCheck, Zap, Sparkles, Lightbulb } from "lucide-react";

export const SkeletonOne = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsProcessing(true);
        }, 20000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute opacity-10 hidden sm:block"
                        initial={{
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                            rotate: [0, 180, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    >
                        {i % 3 === 0 ? (
                            <Bot
                                size={80}
                                className="text-indigo-300 dark:text-indigo-700"
                            />
                        ) : i % 3 === 1 ? (
                            <Lightbulb
                                size={60}
                                className="text-amber-300 dark:text-amber-700"
                            />
                        ) : (
                            <Sparkles
                                size={70}
                                className="text-pink-300 dark:text-pink-700"
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    times: [0, 0.5, 1],
                }}
            >
                <Bot className="h-16 w-16 sm:h-24 sm:w-24 text-indigo-500 opacity-10" />
            </motion.div>

            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center space-x-1 sm:space-x-2 z-10">
                <motion.button
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[7px] sm:text-[8px] font-medium ${isProcessing ? "bg-red-500 text-white" : "bg-indigo-500 text-white"}`}
                    onClick={() => setIsProcessing(!isProcessing)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {isProcessing ? "Stop AI" : "Run AI"}
                </motion.button>

                <motion.div
                    className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                >
                    <ShieldCheck className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-green-500" />
                </motion.div>
            </div>

            <motion.div className="z-10 flex flex-col items-center space-y-3 sm:space-y-6 w-full px-2 sm:px-0">
                {isProcessing && (
                    <motion.div
                        className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}

                <motion.div
                    className="flex items-center space-x-2 bg-white dark:bg-neutral-800 p-2 sm:p-3 rounded-lg shadow-md w-full sm:w-3/4 relative z-10"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <BellRing className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                    <div className="text-[10px] sm:text-xs">
                        <p className="font-semibold text-neutral-700 dark:text-neutral-200 truncate">
                            Payment Reminder
                        </p>
                        <p className="text-neutral-500 truncate">
                            Invoice #3021 is 3 days overdue
                        </p>
                    </div>
                    {isProcessing && (
                        <motion.div
                            className="absolute -right-1 -top-1 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    )}
                </motion.div>

                <motion.div
                    className="flex items-center space-x-2 bg-white dark:bg-neutral-800 p-2 sm:p-3 rounded-lg shadow-md w-full sm:w-3/4 relative z-10"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <CheckCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                    <div className="text-[10px] sm:text-xs">
                        <p className="font-semibold text-neutral-700 dark:text-neutral-200 truncate">
                            Invoice Generated
                        </p>
                        <p className="text-neutral-500 truncate">
                            Custom invoice created in 2.3 seconds
                        </p>
                    </div>
                    {isProcessing && (
                        <motion.div
                            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Zap className="h-2 w-2 sm:h-3 sm:w-3 text-amber-500" />
                        </motion.div>
                    )}
                </motion.div>

                {isProcessing && (
                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 p-2 sm:p-3 rounded-lg shadow-lg w-full sm:w-3/4 relative z-10"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" />
                        <div className="text-[10px] sm:text-xs text-white">
                            <p className="font-semibold truncate">
                                AI Analysis
                            </p>
                            <p className="opacity-90 truncate">
                                Processing client payment patterns...
                            </p>
                        </div>
                        <motion.div
                            className="ml-auto h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white" />
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}; 