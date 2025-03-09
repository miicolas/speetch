"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { FeatureGrid, FeatureCard } from "../ui/feature-grid";
import {
    Bot,
    CreditCard,
    Users,
    FileText,
    LifeBuoy,
    BellRing,
    CheckCheck,
    ChevronRight,
    Zap,
    ShieldCheck,
    Sparkles,
    Lightbulb,
} from "lucide-react";
import { motion } from "motion/react";

export default function Features() {
    return (
        <FeatureGrid className="mx-auto auto-rows-[15rem] md:auto-rows-[16rem]">
            {items.map((item, i) => (
                <FeatureCard
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={cn("[&>p:text-lg]", item.className)}
                    icon={item.icon}
                    isNew={item.isNew}
                    disabled={item.disabled}
                />
            ))}
        </FeatureGrid>
    );
}

const SkeletonOne = () => {
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

const SkeletonTwo = () => {
    const [paymentOption, setPaymentOption] = useState("split");
    const [securityVerified, setSecurityVerified] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSecurityVerified(true);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-full h-full px-2 sm:px-0">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-5 left-5 opacity-10 text-indigo-300 dark:text-indigo-600 hidden sm:block"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="6" />
                            <circle cx="12" cy="12" r="2" />
                        </svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-6 right-8 opacity-10 text-purple-300 dark:text-purple-600 hidden sm:block"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </motion.div>
                </div>

                {!securityVerified && (
                    <motion.div
                        className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center p-2 sm:p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-neutral-900 p-3 sm:p-4 rounded-lg flex flex-col items-center max-w-[90%] sm:max-w-[80%]"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                        >
                            <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-500 mb-2" />
                            <p className="text-[10px] sm:text-xs font-medium text-neutral-800 dark:text-neutral-200 text-center mb-2 sm:mb-3">
                                Security Verification
                            </p>
                            <motion.button
                                className="text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-500 text-white rounded-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSecurityVerified(true)}
                            >
                                Verify Identity
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                <motion.div
                    className="relative w-36 sm:w-52 h-24 sm:h-32"
                    animate={{
                        x: paymentOption === "split" ? "-5%" : 0,
                        rotate: paymentOption === "split" ? -5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-3 sm:p-4 flex flex-col justify-between"
                        animate={{
                            rotateY: [0, 5, 0, -5, 0],
                            y: [0, -2, 0, 2, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-8 sm:w-12 h-5 sm:h-8 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded opacity-80" />
                            <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 text-white opacity-80" />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                            <div className="w-full h-3 sm:h-4 bg-white bg-opacity-20 rounded" />
                            <div className="flex justify-between">
                                <div className="w-14 sm:w-20 h-2 sm:h-3 bg-white bg-opacity-20 rounded" />
                                <div className="w-6 sm:w-8 h-2 sm:h-3 bg-white bg-opacity-20 rounded" />
                            </div>
                        </div>

                        <motion.div
                            className="absolute bottom-2 right-2 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white/30 flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            title="Secure Transaction"
                        >
                            <ShieldCheck className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute right-2 sm:right-10 flex flex-col space-y-1.5 sm:space-y-2"
                    animate={{
                        x: paymentOption === "split" ? 0 : -10,
                        opacity: 1,
                    }}
                    initial={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <motion.div
                        className={`rounded-lg shadow-md p-1.5 sm:p-2 flex items-center justify-between w-24 sm:w-32 text-[9px] sm:text-xs font-medium ${
                            paymentOption === "full"
                                ? "bg-indigo-500 text-white"
                                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaymentOption("full")}
                    >
                        <span>Full Payment</span>
                        {paymentOption === "full" && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 15,
                                }}
                            >
                                <CheckCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        className={`rounded-lg shadow-md p-1.5 sm:p-2 flex items-center justify-between w-24 sm:w-32 text-[9px] sm:text-xs font-medium ${
                            paymentOption === "split"
                                ? "bg-indigo-500 text-white"
                                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaymentOption("split")}
                    >
                        <span>Split Payment</span>
                        {paymentOption === "split" && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 15,
                                }}
                            >
                                <CheckCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </motion.div>
                        )}
                    </motion.div>

                    {paymentOption === "split" && (
                        <motion.div
                            className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-1.5 sm:p-2 space-y-1 w-24 sm:w-32"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                    Now
                                </span>
                                <span className="text-[8px] sm:text-[9px] font-medium text-indigo-600 dark:text-indigo-400">
                                    50%
                                </span>
                            </div>
                            <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-indigo-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: "50%" }}
                                    transition={{ duration: 0.7 }}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                    Later
                                </span>
                                <span className="text-[8px] sm:text-[9px] font-medium text-indigo-600 dark:text-indigo-400">
                                    50%
                                </span>
                            </div>
                            <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-indigo-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: "50%" }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                />
                            </div>

                            <motion.button
                                className="mt-1.5 w-full text-[8px] sm:text-[9px] py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Confirm Plan
                                <ChevronRight className="h-2 w-2 ml-1" />
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

const SkeletonThree = () => {
    const [selectedDoc, setSelectedDoc] = useState("contract");

    return (
        <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center relative">
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute opacity-5 hidden sm:block"
                        initial={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            scale: 0.8,
                        }}
                    >
                        <FileText size={24} />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="absolute w-[92%] sm:w-3/4 h-4/5 flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex bg-white dark:bg-neutral-800 rounded-t-lg overflow-hidden">
                    <motion.div
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-xs font-medium cursor-pointer border-b-2 ${selectedDoc === "contract" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-neutral-500"}`}
                        onClick={() => setSelectedDoc("contract")}
                        whileHover={{
                            backgroundColor: "rgba(79, 70, 229, 0.1)",
                        }}
                    >
                        Contract
                    </motion.div>
                    <motion.div
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-xs font-medium cursor-pointer border-b-2 ${selectedDoc === "invoice" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-neutral-500"}`}
                        onClick={() => setSelectedDoc("invoice")}
                        whileHover={{
                            backgroundColor: "rgba(79, 70, 229, 0.1)",
                        }}
                    >
                        Invoice
                    </motion.div>
                    <motion.div
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-xs font-medium cursor-pointer border-b-2 ${selectedDoc === "taxes" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-neutral-500"}`}
                        onClick={() => setSelectedDoc("taxes")}
                        whileHover={{
                            backgroundColor: "rgba(79, 70, 229, 0.1)",
                        }}
                    >
                        Taxes
                    </motion.div>

                    <div className="ml-auto flex items-center px-2">
                        <motion.div
                            className="h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center cursor-pointer text-neutral-500"
                            whileHover={{ scale: 1.1, color: "#4f46e5" }}
                        >
                            <LifeBuoy className="h-3 w-3 sm:h-4 sm:w-4" />
                        </motion.div>
                    </div>
                </div>

                <div className="flex-1 bg-neutral-50 dark:bg-neutral-900 rounded-b-lg relative overflow-hidden border-t border-neutral-200 dark:border-neutral-700">
                    {selectedDoc === "contract" && (
                        <motion.div
                            className="h-full p-2 sm:p-4 flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-2 sm:mb-3 z-10 backdrop-blur-sm">
                                <div className="text-[10px] sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                    Freelance Agreement
                                </div>

                                <motion.div
                                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded text-[8px] sm:text-[10px] flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <CheckCheck className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                                    Auto-Generated
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: ["0%", "-70%"] }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }}
                                className="space-y-1.5 sm:space-y-2"
                            >
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`h-1.5 sm:h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full ${i === 0 || i === 5 ? "w-1/2" : "w-full"}`}
                                    />
                                ))}

                                <div className="h-6 sm:h-8" />

                                <div className="border border-neutral-200 dark:border-neutral-700 rounded p-2 sm:p-3 bg-white dark:bg-neutral-800">
                                    <div className="text-[8px] sm:text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-1.5 sm:mb-2">
                                        Client Information
                                    </div>
                                    <div className="space-y-1 sm:space-y-1.5">
                                        <div className="h-1.5 sm:h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full w-3/4" />
                                        <div className="h-1.5 sm:h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full w-1/2" />
                                    </div>
                                </div>

                                <div className="h-8" />

                                <div className="border border-neutral-200 dark:border-neutral-700 rounded p-3 bg-white dark:bg-neutral-800">
                                    <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                                        Client Information
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full w-3/4" />
                                        <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full w-1/2" />
                                    </div>
                                </div>

                                {Array.from({ length: 8 }).map((_, i) => (
                                    <motion.div
                                        key={`second-${i}`}
                                        className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full"
                                        style={{
                                            width: `${Math.random() * 40 + 60}%`,
                                        }}
                                    />
                                ))}

                                <div className="border border-neutral-200 dark:border-neutral-700 rounded p-3 bg-white dark:bg-neutral-800">
                                    <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                                        Payment Terms
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full w-full" />
                                        <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full w-2/3" />
                                        <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full w-3/4" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {selectedDoc === "invoice" && (
                        <motion.div
                            className="h-full p-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 p-3 flex flex-col h-full overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                            INVOICE
                                        </div>
                                        <div className="text-[10px] text-neutral-500">
                                            #INV-2023-056
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 dark:bg-indigo-900/30 h-8 w-8 rounded flex items-center justify-center">
                                        <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <div className="text-[10px] text-neutral-500 mb-1">
                                            From
                                        </div>
                                        <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                                            Your Business Name
                                        </div>
                                        <div className="text-[10px] text-neutral-500">
                                            your@email.com
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-neutral-500 mb-1">
                                            To
                                        </div>
                                        <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                                            Client Company
                                        </div>
                                        <div className="text-[10px] text-neutral-500">
                                            client@email.com
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 border-t border-b border-neutral-200 dark:border-neutral-700 py-3 mb-3">
                                    <div className="text-[10px] text-neutral-500 mb-2">
                                        Items
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            {
                                                name: "Website Design",
                                                price: "$1,200.00",
                                            },
                                            {
                                                name: "Development",
                                                price: "$2,400.00",
                                            },
                                            {
                                                name: "SEO Setup",
                                                price: "$800.00",
                                            },
                                        ].map((item, i) => (
                                            <motion.div
                                                key={item.name}
                                                className="flex justify-between items-center"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <div className="text-xs text-neutral-700 dark:text-neutral-300">
                                                    {item.name}
                                                </div>
                                                <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                                                    {item.price}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                                        Total
                                    </div>
                                    <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                        $4,400.00
                                    </div>
                                </div>

                                <motion.button
                                    className="mt-4 w-full py-1.5 bg-indigo-500 text-white text-xs rounded-md"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Send Invoice
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {selectedDoc === "taxes" && (
                        <motion.div
                            className="h-full p-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                    Tax Calculator
                                </div>
                                <div className="text-[10px] text-neutral-500">
                                    FY 2023
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="bg-white dark:bg-neutral-800 rounded p-2 border border-neutral-200 dark:border-neutral-700">
                                    <div className="text-[10px] text-neutral-500 mb-1">
                                        Gross Income
                                    </div>
                                    <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                        $120,000.00
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-neutral-800 rounded p-2 border border-neutral-200 dark:border-neutral-700">
                                    <div className="text-[10px] text-neutral-500 mb-1">
                                        Business Expenses
                                    </div>
                                    <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                        $35,400.00
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-xs text-neutral-700 dark:text-neutral-300">
                                            Income Tax (22%)
                                        </div>
                                        <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                                            $18,612.00
                                        </div>
                                    </div>
                                    <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-amber-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: "22%" }}
                                            transition={{ duration: 0.8 }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-xs text-neutral-700 dark:text-neutral-300">
                                            Deductions
                                        </div>
                                        <div className="text-xs font-medium text-green-600 dark:text-green-400">
                                            -$12,550.00
                                        </div>
                                    </div>
                                    <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-green-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: "12%" }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        Total Tax Due
                                    </div>
                                    <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                        $18,996.62
                                    </div>
                                </div>
                                <motion.button
                                    className="px-3 py-1 bg-indigo-500 text-white text-xs rounded-md flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Calculate
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

        </motion.div>
    );
};

const SkeletonFour = () => {
    const [activeTab, setActiveTab] = useState("clients");

    return (
        <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] p-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl w-full h-full p-3 flex flex-col">
                <div className="flex border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-2">
                    <motion.div
                        className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer ${
                            activeTab === "clients"
                                ? " text-indigo-600 dark:text-indigo-400"
                                : "border-transparent text-neutral-500"
                        }`}
                        whileHover={{
                            scale: activeTab !== "clients" ? 1.05 : 1,
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab("clients")}
                    >
                        Clients
                    </motion.div>
                    <motion.div
                        className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer ${
                            activeTab === "projects"
                                ? " text-indigo-600 dark:text-indigo-400"
                                : "border-transparent text-neutral-500"
                        }`}
                        whileHover={{
                            scale: activeTab !== "projects" ? 1.05 : 1,
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab("projects")}
                    >
                        Projects
                    </motion.div>
                    <motion.div
                        className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer ${
                            activeTab === "analytics"
                                ? " text-indigo-600 dark:text-indigo-400"
                                : "border-transparent text-neutral-500"
                        }`}
                        whileHover={{
                            scale: activeTab !== "analytics" ? 1.05 : 1,
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab("analytics")}
                    >
                        Analytics
                    </motion.div>

                    <div className="ml-auto flex items-center px-2">
                        <motion.div
                            className="h-5 w-5 rounded-full flex items-center justify-center cursor-pointer text-neutral-500"
                            whileHover={{ scale: 1.1, color: "#4f46e5" }}
                        >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H9.5C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8H7.50003C7.22389 8 7.00003 7.77614 7.00003 7.5V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </motion.div>
                        <motion.div
                            className="h-6 w-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center cursor-pointer"
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: "#f3f4f6",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H9.5C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8H7.50003C7.22389 8 7.00003 7.77614 7.00003 7.5V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </motion.div>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    {activeTab === "clients" && (
                        <motion.div
                            className="h-full flex flex-col"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                    Client List
                                </div>
                                <div className="flex space-x-1">
                                    <motion.div
                                        className="text-[10px] px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Add New
                                    </motion.div>
                                    <motion.div
                                        className="text-[10px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Filter
                                    </motion.div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto pr-1 space-y-2">
                                {["Apple Inc.", "Dropbox", "Salesforce"].map(
                                    (client, i) => (
                                        <motion.div
                                            key={client}
                                            className={`rounded-lg p-2 border ${i === 0 ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20" : "border-neutral-200 dark:border-neutral-800"} flex items-center`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{
                                                scale: 1.01,
                                                backgroundColor:
                                                    i === 0 ? "" : "#f9fafb",
                                            }}
                                        >
                                            <div
                                                className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${i === 0 ? "bg-indigo-500" : i === 1 ? "bg-blue-500" : "bg-green-500"} mr-2 text-xs font-bold`}
                                            >
                                                {client.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                                                    {client}
                                                </div>
                                                <div className="text-[10px] text-neutral-500">
                                                    {i === 0
                                                        ? "3 active projects"
                                                        : i === 1
                                                          ? "1 active project"
                                                          : "2 active projects"}
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-medium">
                                                {i === 0 ? (
                                                    <span className="text-green-600 dark:text-green-400">
                                                        $24,500
                                                    </span>
                                                ) : i === 1 ? (
                                                    <span className="text-blue-600 dark:text-blue-400">
                                                        $8,200
                                                    </span>
                                                ) : (
                                                    <span className="text-neutral-600 dark:text-neutral-400">
                                                        $15,300
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "projects" && (
                        <motion.div
                            className="h-full flex flex-col"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex justify-between mb-2">
                                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                    Projects Status
                                </div>
                                <div className="text-[10px] px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full cursor-pointer">
                                    New Project
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto pr-1 space-y-2">
                                {[
                                    {
                                        name: "Website Redesign",
                                        client: "Apple Inc.",
                                        progress: 75,
                                        status: "In Progress",
                                    },
                                    {
                                        name: "Mobile App Development",
                                        client: "Dropbox",
                                        progress: 30,
                                        status: "In Progress",
                                    },
                                    {
                                        name: "Marketing Dashboard",
                                        client: "Salesforce",
                                        progress: 100,
                                        status: "Completed",
                                    },
                                ].map((project, i) => (
                                    <motion.div
                                        key={project.name}
                                        className="rounded-lg p-2 border border-neutral-200 dark:border-neutral-800 flex flex-col space-y-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{
                                            scale: 1.01,
                                            backgroundColor: "#f9fafb",
                                        }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                                                    {project.name}
                                                </div>
                                                <div className="text-[10px] text-neutral-500">
                                                    {project.client}
                                                </div>
                                            </div>
                                            <div
                                                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                                    project.status ===
                                                    "Completed"
                                                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                                                }`}
                                            >
                                                {project.status}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px]">
                                                <span className="text-neutral-500">
                                                    Progress
                                                </span>
                                                <span className="text-neutral-700 dark:text-neutral-300">
                                                    {project.progress}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className={`h-full ${
                                                        project.status ===
                                                        "Completed"
                                                            ? "bg-green-500"
                                                            : "bg-indigo-500"
                                                    }`}
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width: `${project.progress}%`,
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: 0.2 + i * 0.1,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "analytics" && (
                        <motion.div
                            className="h-full flex flex-col"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                    Revenue Insights
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="text-[10px] text-neutral-500">
                                        <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mr-1"></span>
                                        This Month
                                    </div>
                                    <div className="text-[10px] text-neutral-500">
                                        <span className="inline-block h-2 w-2 rounded-full bg-blue-300 mr-1"></span>
                                        Last Month
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="h-28 flex items-end justify-between px-1">
                                    {[65, 45, 75, 50, 85, 70].map(
                                        (height, i) => (
                                            <div
                                                key={i}
                                                className="h-full flex items-end space-x-0.5"
                                            >
                                                <motion.div
                                                    className="w-3 bg-indigo-500 rounded-t-sm"
                                                    initial={{ height: 0 }}
                                                    animate={{
                                                        height: `${height}%`,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: i * 0.05,
                                                    }}
                                                />
                                                <motion.div
                                                    className="w-3 bg-blue-300 rounded-t-sm"
                                                    initial={{ height: 0 }}
                                                    animate={{
                                                        height: `${Math.max(20, height - 15 - (i % 2 === 0 ? 10 : -10))}%`,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: 0.1 + i * 0.05,
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="h-10 border-t border-neutral-200 dark:border-neutral-800 mt-2 pt-2">
                                    <div className="grid grid-cols-6 gap-x-2">
                                        {[
                                            "Mon",
                                            "Tue",
                                            "Wed",
                                            "Thu",
                                            "Fri",
                                            "Sat",
                                        ].map((day) => (
                                            <div
                                                key={day}
                                                className="text-center text-[9px] text-neutral-500"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <motion.div
                                        className="flex-1 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="text-[10px] text-neutral-500">
                                            Total Clients
                                        </div>
                                        <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                            12
                                        </div>
                                    </motion.div>
                                    <div className="w-2"></div>
                                    <motion.div
                                        className="flex-1 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="text-[10px] text-neutral-500">
                                            Active Projects
                                        </div>
                                        <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                            8
                                        </div>
                                    </motion.div>
                                    <div className="w-2"></div>
                                    <motion.div
                                        className="flex-1 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="text-[10px] text-neutral-500">
                                            Total Revenue
                                        </div>
                                        <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                            $48,200
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const SkeletonFive = () => {
    return (
        <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center p-3">
            <motion.div
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl w-full h-full overflow-hidden flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="px-3 py-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>Client Dashboard</span>
                    </div>
                    <div className="text-xs text-indigo-500">
                        Project ID: PRJ-2023
                    </div>
                </div>

                <div className="flex-1 p-3 flex flex-col space-y-3">
                    <motion.div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                Project Progress
                            </span>
                            <motion.span
                                className="text-indigo-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                78%
                            </motion.span>
                        </div>
                        <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: "78%" }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2 flex justify-between items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center">
                            <CreditCard className="h-3 w-3 text-indigo-500 mr-2" />
                            <span className="text-xs text-neutral-700 dark:text-neutral-300">
                                Payment Status
                            </span>
                        </div>
                        <div className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            50% Paid
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 flex justify-between items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center">
                            <CreditCard className="h-3 w-3 text-neutral-500 mr-2" />
                            <span className="text-xs text-neutral-700 dark:text-neutral-300">
                                Next Payment
                            </span>
                        </div>
                        <motion.button
                            className="text-xs px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Pay Now
                            <ChevronRight className="h-3 w-3 ml-1" />
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                            Project Milestones
                        </div>
                        <div className="space-y-1.5">
                            <motion.div
                                className="flex items-center"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                    Initial Design
                                </span>
                                <div className="ml-auto text-xs text-green-500">
                                    Completed
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex items-center"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                    Development Phase
                                </span>
                                <div className="ml-auto text-xs text-green-500">
                                    Completed
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex items-center"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                    Testing Phase
                                </span>
                                <div className="ml-auto text-xs text-amber-500">
                                    In Progress
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex items-center"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                            >
                                <div className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mr-2"></div>
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                    Final Delivery
                                </span>
                                <div className="ml-auto text-xs text-neutral-500">
                                    Pending
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const items = [
    {
        title: "Smart Automation & AI",
        description: (
            <span className="text-sm">
                AI tracks payments and automatically sends reminders to late
                payers. Generate custom invoices in seconds.
            </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <Bot className="h-4 w-4 text-neutral-500" />,
        isNew: true,
        disabled: false,
    },
    {
        title: "Ultra-flexible Payment Solution",
        description: (
            <span className="text-sm">
                Stripe integration for hassle-free payments and transfers. Split
                payment options allow your clients to pay in installments.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <CreditCard className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Simplified Administrative Management",
        description: (
            <span className="text-sm">
                Automatic legal contract generator adapted to local regulations.
                Calculate your taxes and fees with a single click.
            </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <FileText className="h-4 w-4 text-neutral-500" />,
        isNew: true,
        disabled: false,
    },
    {
        title: "CRM Designed for Freelancers",
        description: (
            <span className="text-sm">
                Intuitive dashboard to manage clients and projects. Automatic
                analysis of your most profitable clients. Integration with
                Slack, Notion, and Trello.
            </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <Users className="h-4 w-4 text-neutral-500" />,
        isNew: true,
        disabled: false,
    },
    {
        title: "Support & Guidance",
        description: (
            <span className="text-sm">
                Client contact form creation, project calendar, and dashboard to
                track progress and payments.
            </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <LifeBuoy className="h-4 w-4 text-neutral-500" />,
        isNew: true,
        disabled: false,
    },
];
