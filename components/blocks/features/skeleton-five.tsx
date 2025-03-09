"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LifeBuoy, HelpCircle, MessageCircle, ChevronRight, CheckCircle, AlertTriangle, XCircle, Link as LinkIcon } from "lucide-react";

export const SkeletonFive = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [showSupport, setShowSupport] = useState(false);

    const steps = [
        {
            title: "Create Project",
            status: "completed",
            icon: CheckCircle,
            iconColor: "text-green-500",
        },
        {
            title: "Setup Contract",
            status: "active",
            icon: AlertTriangle,
            iconColor: "text-amber-500",
        },
        {
            title: "Client Approval",
            status: "upcoming",
            icon: null,
            iconColor: "",
        },
        {
            title: "Final Delivery",
            status: "upcoming",
            icon: null,
            iconColor: "",
        },
    ];

    return (
        <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-2 sm:p-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                        <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500" />
                        <span className="text-[10px] sm:text-xs font-medium">
                            Workflow: Project Setup
                        </span>
                    </div>
                    <motion.button
                        className="flex items-center space-x-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[8px] sm:text-[10px] px-2 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowSupport(!showSupport)}
                    >
                        <LifeBuoy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span>Support</span>
                    </motion.button>
                </div>

                {/* Main content area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left side - workflow steps */}
                    <div className="w-1/3 p-2 sm:p-3 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto">
                        <div className="text-[9px] sm:text-[11px] text-neutral-500 mb-2">
                            Progress: Step {activeStep} of {steps.length}
                        </div>

                        <div className="space-y-1">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-2 rounded-md cursor-pointer ${
                                        index === activeStep - 1
                                            ? "bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/60"
                                            : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                    }`}
                                    onClick={() => setActiveStep(index + 1)}
                                    whileHover={{ x: 2 }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center 
                                            ${
                                                step.status === "completed"
                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                                    : step.status === "active"
                                                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                                                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                                            }`}
                                        >
                                            {step.status === "completed" ? (
                                                <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                            ) : step.status === "active" ? (
                                                <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                            ) : (
                                                <span className="text-[7px] sm:text-[8px] font-medium">
                                                    {index + 1}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className={`text-[9px] sm:text-[11px] font-medium ${
                                                    index === activeStep - 1
                                                        ? "text-indigo-600 dark:text-indigo-400"
                                                        : ""
                                                }`}
                                            >
                                                {step.title}
                                            </span>
                                            <span className="text-[7px] sm:text-[8px] text-neutral-500">
                                                {step.status === "completed"
                                                    ? "Completed"
                                                    : step.status === "active"
                                                    ? "In Progress"
                                                    : "Not Started"}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - content and support chat */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Active step content */}
                        <div
                            className={`flex-1 p-2 sm:p-3 overflow-y-auto ${
                                showSupport ? "hidden sm:block" : ""
                            }`}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center space-x-1 mb-1">
                                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                                    <h3 className="text-[11px] sm:text-sm font-semibold">
                                        Setup Contract
                                    </h3>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[8px] sm:text-[10px] text-neutral-600 dark:text-neutral-400">
                                        Create a legal contract for your project. This will
                                        protect both you and your client.
                                    </p>

                                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-2 rounded-md text-[8px] sm:text-[9px] text-amber-700 dark:text-amber-400">
                                        <div className="font-semibold mb-0.5">Important:</div>
                                        <p>
                                            Make sure to include payment terms, project scope,
                                            and delivery timeline in your contract.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="text-[9px] sm:text-[11px] font-medium">
                                        Required Information:
                                    </div>
                                    {[
                                        "Client details",
                                        "Project scope",
                                        "Payment terms",
                                        "Timeline",
                                        "Deliverables",
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center space-x-1.5"
                                        >
                                            <div
                                                className={`h-3 w-3 rounded-full border ${
                                                    i < 3
                                                        ? "bg-green-100 dark:bg-green-900/30 border-green-400"
                                                        : "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                                                }`}
                                            >
                                                {i < 3 && (
                                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                                )}
                                            </div>
                                            <span
                                                className={`text-[8px] sm:text-[10px] ${
                                                    i < 3
                                                        ? "text-neutral-900 dark:text-neutral-100"
                                                        : "text-neutral-500"
                                                }`}
                                            >
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-2 flex flex-col space-y-2">
                                    <div className="text-[9px] sm:text-[11px] font-medium">
                                        Templates:
                                    </div>
                                    {[
                                        {
                                            name: "Standard Service Agreement",
                                            description:
                                                "Best for general freelance work",
                                        },
                                        {
                                            name: "Web Development Contract",
                                            description:
                                                "Specific for web development projects",
                                        },
                                    ].map((template, i) => (
                                        <motion.div
                                            key={i}
                                            className="bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded-md flex items-center justify-between cursor-pointer"
                                            whileHover={{
                                                backgroundColor:
                                                    "rgba(99, 102, 241, 0.05)",
                                            }}
                                        >
                                            <div>
                                                <div className="text-[8px] sm:text-[10px] font-medium">
                                                    {template.name}
                                                </div>
                                                <div className="text-[7px] sm:text-[8px] text-neutral-500">
                                                    {template.description}
                                                </div>
                                            </div>
                                            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-400" />
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="pt-2 flex justify-between">
                                    <motion.button
                                        className="text-[8px] sm:text-[10px] px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Previous: Create Project
                                    </motion.button>
                                    <motion.button
                                        className="text-[8px] sm:text-[10px] px-3 py-1.5 bg-indigo-500 text-white hover:bg-indigo-600 rounded"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Continue to Client Approval
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Support chat overlay on small screens, side panel on larger */}
                        {showSupport && (
                            <motion.div
                                className="absolute sm:relative inset-0 sm:inset-auto sm:w-1/3 sm:border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-10 flex flex-col"
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-2 sm:p-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                                    <div className="flex items-center space-x-1.5">
                                        <HelpCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-indigo-500" />
                                        <span className="text-[10px] sm:text-xs font-medium">
                                            Support Chat
                                        </span>
                                    </div>
                                    <motion.button
                                        className="sm:hidden h-5 w-5 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowSupport(false)}
                                    >
                                        <XCircle className="h-3.5 w-3.5 text-neutral-500" />
                                    </motion.button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2">
                                    <div className="flex justify-start">
                                        <div className="bg-neutral-100 dark:bg-neutral-800 p-1.5 sm:p-2 rounded-lg rounded-tl-none max-w-[80%]">
                                            <p className="text-[8px] sm:text-[9px]">
                                                Hello! How can I help you with setting up your
                                                contract?
                                            </p>
                                            <p className="text-right text-[6px] sm:text-[7px] text-neutral-500 mt-1">
                                                Support • 2m ago
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 sm:p-2 rounded-lg rounded-tr-none max-w-[80%]">
                                            <p className="text-[8px] sm:text-[9px]">
                                                I'm not sure which template to choose for my
                                                graphic design project.
                                            </p>
                                            <p className="text-right text-[6px] sm:text-[7px] text-neutral-500 mt-1">
                                                You • 1m ago
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-start">
                                        <div className="bg-neutral-100 dark:bg-neutral-800 p-1.5 sm:p-2 rounded-lg rounded-tl-none max-w-[80%]">
                                            <p className="text-[8px] sm:text-[9px]">
                                                For graphic design work, I'd recommend starting
                                                with the "Standard Service Agreement" and adding
                                                custom clauses about design ownership and usage
                                                rights.
                                            </p>
                                            <p className="text-right text-[6px] sm:text-[7px] text-neutral-500 mt-1">
                                                Support • Just now
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Type your message..."
                                            className="w-full text-[8px] sm:text-[10px] p-1.5 sm:p-2 pr-8 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800"
                                        />
                                        <motion.button
                                            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center rounded-full bg-indigo-500 text-white"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}; 