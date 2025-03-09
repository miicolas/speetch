"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle, Shield, ChevronRight } from "lucide-react";

export const SkeletonTwo = () => {
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
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20 0L24.4903 15.5097L40 20L24.4903 24.4903L20 40L15.5097 24.4903L0 20L15.5097 15.5097L20 0Z"
                                fill="currentColor"
                            />
                        </svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-5 right-5 opacity-10 text-indigo-300 dark:text-indigo-600 hidden sm:block"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="40" height="40" rx="20" fill="currentColor" />
                        </svg>
                    </motion.div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 w-full">
                    <div className="p-2 sm:p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-md w-full sm:w-4/5 max-w-md">
                        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-2 sm:pb-3">
                            <div className="flex items-center space-x-2">
                                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                                <span className="text-xs sm:text-sm font-medium">
                                    Payment Options
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <motion.div
                                    className={`h-2 w-2 rounded-full ${securityVerified ? "bg-green-500" : "bg-amber-500"}`}
                                    animate={
                                        securityVerified
                                            ? { scale: [1, 1.2, 1] }
                                            : { scale: 1 }
                                    }
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <span className="text-[8px] sm:text-[10px] text-neutral-500">
                                    {securityVerified ? "Secure" : "Verifying..."}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-2">
                            <motion.div
                                className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${
                                    paymentOption === "full"
                                        ? "bg-indigo-50 dark:bg-indigo-900/30"
                                        : "bg-neutral-50 dark:bg-neutral-800/50"
                                }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setPaymentOption("full")}
                            >
                                <span className="text-[8px] sm:text-[10px] font-medium">
                                    Full Payment
                                </span>
                                <div className="text-[6px] sm:text-[8px] text-neutral-500 mt-1">
                                    Pay the entire amount at once
                                </div>
                                {paymentOption === "full" && (
                                    <motion.div
                                        className="mt-1"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-indigo-500" />
                                    </motion.div>
                                )}
                            </motion.div>

                            <motion.div
                                className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${
                                    paymentOption === "split"
                                        ? "bg-indigo-50 dark:bg-indigo-900/30"
                                        : "bg-neutral-50 dark:bg-neutral-800/50"
                                }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setPaymentOption("split")}
                            >
                                <span className="text-[8px] sm:text-[10px] font-medium">
                                    Split Payment
                                </span>
                                <div className="text-[6px] sm:text-[8px] text-neutral-500 mt-1">
                                    Pay in 3 interest-free installments
                                </div>
                                {paymentOption === "split" && (
                                    <motion.div
                                        className="mt-1"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-indigo-500" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {paymentOption === "split" && (
                            <motion.div
                                className="mt-2 bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded-lg"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-[8px] sm:text-[10px] font-medium">
                                        Payment Breakdown
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {[
                                        {
                                            date: "Today",
                                            amount: "$500.00",
                                            status: "Due now",
                                        },
                                        {
                                            date: "Jun 15, 2023",
                                            amount: "$500.00",
                                            status: "Upcoming",
                                        },
                                        {
                                            date: "Jul 15, 2023",
                                            amount: "$500.00",
                                            status: "Upcoming",
                                        },
                                    ].map((payment, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center"
                                        >
                                            <div className="flex items-center space-x-1">
                                                <div
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        i === 0
                                                            ? "bg-indigo-500"
                                                            : "bg-neutral-300 dark:bg-neutral-600"
                                                    }`}
                                                />
                                                <span className="text-[6px] sm:text-[8px]">
                                                    {payment.date}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[6px] sm:text-[8px]">
                                                    {payment.amount}
                                                </span>
                                                <span
                                                    className={`text-[6px] sm:text-[8px] ${
                                                        i === 0
                                                            ? "text-red-500"
                                                            : "text-neutral-500"
                                                    }`}
                                                >
                                                    {payment.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        <motion.button
                            className="mt-2 sm:mt-3 w-full bg-indigo-500 text-white text-[8px] sm:text-[10px] py-1.5 sm:py-2 rounded-md flex items-center justify-center space-x-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>Proceed to Secure Checkout</span>
                            <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        </motion.button>
                    </div>

                    <div className="flex items-center space-x-1 text-[6px] sm:text-[8px] text-neutral-500">
                        <Shield className="h-2 w-2 sm:h-3 sm:w-3 text-green-500" />
                        <span>
                            Secured by Stripe • All major cards accepted
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}; 