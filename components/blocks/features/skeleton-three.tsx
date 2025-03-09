"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Settings, DownloadCloud, Check, Info, Calendar } from "lucide-react";

export const SkeletonThree = () => {
    const [activeTab, setActiveTab] = useState("contracts");
    const [contractGenerated, setContractGenerated] = useState(false);

    return (
        <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-full h-full px-2 sm:px-0">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Background decoration */}
                    <motion.div
                        className="absolute -top-10 -right-10 w-20 h-20 sm:w-40 sm:h-40 opacity-10 text-neutral-300 dark:text-neutral-700"
                        initial={{ opacity: 0.1, rotate: 0 }}
                        animate={{ opacity: [0.1, 0.15, 0.1], rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                        <svg
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M100 0C100 0 100 0 100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0ZM26.4878 40.6508C15.6038 51.5348 7.31495 63.4767 4.48406 83.3524C1.65317 103.228 3.14431 139.267 17.3897 160.982C31.635 182.698 59.5267 194.1 87.4184 191.269C115.31 188.438 143.201 172.021 169.246 145.976C195.291 119.931 202.611 85.3836 195.98 57.4919C189.349 29.6002 168.786 8.36302 140.894 3.08916C113.003 -2.1847 77.6055 10.0969 55.8897 19.9214C34.1739 29.7459 37.3717 29.7668 26.4878 40.6508Z"
                                fill="currentColor"
                            />
                        </svg>
                    </motion.div>
                </div>

                <div className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden">
                    {/* Header tabs */}
                    <div className="flex border-b border-neutral-200 dark:border-neutral-800">
                        <motion.button
                            className={`flex-1 py-2 text-[8px] sm:text-[10px] font-medium transition-colors ${
                                activeTab === "contracts"
                                    ? "text-indigo-600 border-b-2 border-indigo-500"
                                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                            }`}
                            onClick={() => setActiveTab("contracts")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center justify-center space-x-1">
                                <FileText className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                <span>Contracts</span>
                            </div>
                        </motion.button>
                        <motion.button
                            className={`flex-1 py-2 text-[8px] sm:text-[10px] font-medium transition-colors ${
                                activeTab === "taxes"
                                    ? "text-indigo-600 border-b-2 border-indigo-500"
                                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                            }`}
                            onClick={() => setActiveTab("taxes")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center justify-center space-x-1">
                                <Settings className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                <span>Tax Calculator</span>
                            </div>
                        </motion.button>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                        {activeTab === "contracts" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-3"
                            >
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] sm:text-xs font-medium">
                                            Contract Generator
                                        </span>
                                        <div className="flex items-center space-x-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            <span className="text-[8px] sm:text-[10px] text-neutral-500">
                                                Available
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                                Contract Type
                                            </span>
                                            <select className="text-[8px] sm:text-[10px] p-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800">
                                                <option>Freelance Services</option>
                                                <option>Consulting Agreement</option>
                                                <option>Project Contract</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                                Region
                                            </span>
                                            <select className="text-[8px] sm:text-[10px] p-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800">
                                                <option>United States</option>
                                                <option>European Union</option>
                                                <option>United Kingdom</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                            Additional Clauses
                                        </span>
                                        <div className="space-y-1">
                                            {[
                                                "Non-disclosure Agreement",
                                                "Intellectual Property Rights",
                                                "Revision Policy",
                                            ].map((clause, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center space-x-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="h-2 w-2 rounded text-indigo-500"
                                                        defaultChecked={i < 2}
                                                    />
                                                    <span className="text-[8px] sm:text-[10px]">
                                                        {clause}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    className="w-full bg-indigo-500 text-white text-[8px] sm:text-[10px] py-1.5 sm:py-2 rounded-md flex items-center justify-center space-x-1"
                                    onClick={() => setContractGenerated(true)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {contractGenerated ? (
                                        <>
                                            <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                            <span>Contract Generated</span>
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                            <span>Generate Contract</span>
                                        </>
                                    )}
                                </motion.button>

                                {contractGenerated && (
                                    <motion.div
                                        className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 p-2 rounded-md"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <FileText className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-indigo-500" />
                                            <div className="text-[8px] sm:text-[10px]">
                                                <p className="font-medium">
                                                    Freelance_Contract_v1.pdf
                                                </p>
                                                <p className="text-neutral-500">
                                                    Generated: 30 seconds ago
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            className="text-[8px] sm:text-[10px] text-indigo-500 hover:text-indigo-600"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <DownloadCloud className="h-3 w-3 sm:h-4 sm:w-4" />
                                        </motion.button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === "taxes" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-3"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] sm:text-xs font-medium">
                                        Tax Calculator
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <Info className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500" />
                                        <span className="text-[8px] sm:text-[10px] text-neutral-500">
                                            For estimation only
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                            Gross Income
                                        </span>
                                        <div className="relative">
                                            <span className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-[8px] sm:text-[10px] text-neutral-500">
                                                $
                                            </span>
                                            <input
                                                type="text"
                                                defaultValue="65,000"
                                                className="w-full text-[8px] sm:text-[10px] p-1 pl-4 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                            Tax Year
                                        </span>
                                        <div className="relative">
                                            <Calendar className="absolute right-1.5 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 sm:h-3 sm:w-3 text-neutral-500" />
                                            <input
                                                type="text"
                                                defaultValue="2023"
                                                className="w-full text-[8px] sm:text-[10px] p-1 pr-6 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                            Business Type
                                        </span>
                                        <select className="text-[8px] sm:text-[10px] p-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800">
                                            <option>Sole Proprietor</option>
                                            <option>LLC</option>
                                            <option>S-Corporation</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[8px] sm:text-[9px] text-neutral-500">
                                            State
                                        </span>
                                        <select className="text-[8px] sm:text-[10px] p-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800">
                                            <option>California</option>
                                            <option>New York</option>
                                            <option>Texas</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                                    <span className="text-[9px] sm:text-[11px] font-medium">
                                        Estimated Tax Breakdown
                                    </span>
                                    <div className="mt-1 space-y-1">
                                        {[
                                            { label: "Federal Income Tax", amount: "$9,480" },
                                            { label: "Self-Employment Tax", amount: "$9,945" },
                                            { label: "State Income Tax", amount: "$3,900" },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-[8px] sm:text-[10px] text-neutral-500">
                                                    {item.label}
                                                </span>
                                                <span className="text-[8px] sm:text-[10px]">
                                                    {item.amount}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center pt-1 border-t border-neutral-200 dark:border-neutral-800">
                                            <span className="text-[8px] sm:text-[10px] font-medium">
                                                Total Estimated Tax
                                            </span>
                                            <span className="text-[8px] sm:text-[10px] font-medium text-indigo-600">
                                                $23,325
                                            </span>
                                        </div>
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