"use client";

import { motion, Variant } from "motion/react";

interface DashboardCardProps {
    itemVariants: Record<string, Variant>;
}

export const DashboardCard = ({ itemVariants }: DashboardCardProps) => {
    return (
        <motion.div
            variants={itemVariants}
            className="lg:col-span-5 items-center justify-center hidden lg:flex"
        >
            <motion.div
                className="relative w-full max-w-md p-1 border border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-neutral-900 rounded-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <DashboardContent />
            </motion.div>
        </motion.div>
    );
};

const DashboardContent = () => {
    return (
        <div className="relative z-10 flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <motion.div
                        className="h-3 w-3 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        Status: Active
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        Freelancer Dashboard
                    </span>
                </div>
            </div>

            <DashboardTabs />
            <DashboardStats />
            <DashboardDeadlines />
            <DashboardInvoices />
        </div>
    );
};

const DashboardTabs = () => {
    return (
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-2">
            {["Overview", "Clients", "Projects", "Invoices"].map(
                (tab, index) => (
                    <div
                        key={index}
                        className={`px-3 py-2 text-xs font-medium cursor-pointer ${
                            index === 0
                                ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                        }`}
                    >
                        {tab}
                    </div>
                )
            )}
        </div>
    );
};

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-3 gap-2 mb-2">
            <motion.div
                className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-3 text-center"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Active Clients
                </div>
                <div className="text-xl font-semibold mt-1 text-indigo-600 dark:text-indigo-400">
                    8
                </div>
            </motion.div>
            <motion.div
                className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-3 text-center"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Projects
                </div>
                <div className="text-xl font-semibold mt-1 text-purple-600 dark:text-purple-400">
                    12
                </div>
            </motion.div>
            <motion.div
                className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-center"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Paid
                </div>
                <div className="text-xl font-semibold mt-1 text-green-600 dark:text-green-400">
                    $8.5k
                </div>
            </motion.div>
        </div>
    );
};

const DashboardDeadlines = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Upcoming Deadlines</h4>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 cursor-pointer">
                    View all
                </span>
            </div>
            <div className="space-y-2">
                {[
                    {
                        client: "DesignCo",
                        project: "Brand Refresh",
                        dueDate: "Tomorrow",
                        status: "On Track",
                        color: "bg-green-500",
                    },
                    {
                        client: "TechStart",
                        project: "Website Development",
                        dueDate: "3 days",
                        status: "At Risk",
                        color: "bg-amber-500",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between"
                        whileHover={{ x: 3 }}
                        transition={{
                            duration: 0.2,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className={`h-2 w-2 rounded-full ${item.color}`}
                            ></div>
                            <div>
                                <div className="text-xs font-medium">
                                    {item.project}
                                </div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {item.client}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-medium">
                                {item.dueDate}
                            </div>
                            <div
                                className={`text-xs ${
                                    item.status === "On Track"
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-amber-600 dark:text-amber-400"
                                }`}
                            >
                                {item.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const DashboardInvoices = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Recent Invoices</h4>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 cursor-pointer">
                    + New
                </span>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="flex text-xs font-medium bg-neutral-50 dark:bg-neutral-800/50 p-2">
                    <div className="w-1/2">Client</div>
                    <div className="w-1/4 text-right">Amount</div>
                    <div className="w-1/4 text-right">Status</div>
                </div>
                {[
                    {
                        client: "MediaGroup",
                        amount: "$2,400",
                        status: "Paid",
                        statusColor: "text-green-600 dark:text-green-400",
                    },
                    {
                        client: "GlobalTech",
                        amount: "$1,800",
                        status: "Pending",
                        statusColor: "text-amber-600 dark:text-amber-400",
                    },
                ].map((invoice, i) => (
                    <motion.div
                        key={i}
                        className="flex text-xs p-2 border-t border-neutral-200 dark:border-neutral-800"
                        whileHover={{
                            backgroundColor: "rgba(99, 102, 241, 0.05)",
                        }}
                    >
                        <div className="w-1/2">{invoice.client}</div>
                        <div className="w-1/4 text-right font-medium">
                            {invoice.amount}
                        </div>
                        <div
                            className={`w-1/4 text-right ${invoice.statusColor}`}
                        >
                            {invoice.status}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
