"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Phone, Mail, Calendar, MoreHorizontal, Clock, Star } from "lucide-react";

export const SkeletonFour = () => {
    const [activeClient, setActiveClient] = useState(0);

    const clients = [
        {
            name: "TechCorp Inc.",
            avatar: "TC",
            color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300",
            lastContact: "Today",
            status: "Active",
            statusColor: "bg-green-500",
        },
        {
            name: "Design Studio",
            avatar: "DS",
            color: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300",
            lastContact: "Yesterday",
            status: "Active",
            statusColor: "bg-green-500",
        },
        {
            name: "Global Marketing",
            avatar: "GM",
            color: "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300",
            lastContact: "3 days ago",
            status: "Pending",
            statusColor: "bg-amber-500",
        },
    ];

    return (
        <motion.div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center">
            <div className="w-full h-full flex items-stretch overflow-hidden rounded-lg shadow-lg">
                {/* Left sidebar - client list */}
                <div className="w-1/3 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500" />
                                <span className="text-[10px] sm:text-xs font-medium">Clients</span>
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-neutral-500">
                                <span className="font-medium text-indigo-600 dark:text-indigo-400">3</span> Active
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-y-auto flex-1">
                        {clients.map((client, index) => (
                            <motion.div
                                key={index}
                                className={`p-2 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer ${
                                    activeClient === index
                                        ? "bg-indigo-50 dark:bg-indigo-900/30"
                                        : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                }`}
                                onClick={() => setActiveClient(index)}
                                whileHover={{ x: 2 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center rounded-full text-[8px] sm:text-[10px] font-medium ${client.color}`}
                                    >
                                        {client.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] sm:text-xs font-medium truncate">
                                                {client.name}
                                            </span>
                                            <div
                                                className={`h-1.5 w-1.5 rounded-full ${client.statusColor}`}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-1 text-[8px] sm:text-[9px] text-neutral-500">
                                            <Clock className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                                            <span>{client.lastContact}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right side - client details */}
                <div className="flex-1 bg-white dark:bg-neutral-900 flex flex-col overflow-hidden">
                    <div className="p-2 sm:p-3 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center rounded-full text-[8px] sm:text-[10px] font-medium ${clients[activeClient].color}`}
                                >
                                    {clients[activeClient].avatar}
                                </div>
                                <div>
                                    <div className="text-[10px] sm:text-xs font-medium">
                                        {clients[activeClient].name}
                                    </div>
                                    <div className="flex items-center space-x-1 text-[8px] sm:text-[9px] text-neutral-500">
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${clients[activeClient].statusColor}`}
                                        />
                                        <span>{clients[activeClient].status} Client</span>
                                    </div>
                                </div>
                            </div>
                            <motion.button
                                className="h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                whileHover={{ scale: 1.1 }}
                            >
                                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-500" />
                            </motion.button>
                        </div>
                    </div>

                    <div className="p-2 sm:p-3 grid grid-cols-2 gap-2 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                            <div className="h-5 w-5 sm:h-6 sm:w-6 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center rounded-md">
                                <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </div>
                            <span className="text-[8px] sm:text-[10px]">Message</span>
                        </div>
                        <div className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                            <div className="h-5 w-5 sm:h-6 sm:w-6 bg-green-100 dark:bg-green-900/30 text-green-500 flex items-center justify-center rounded-md">
                                <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </div>
                            <span className="text-[8px] sm:text-[10px]">Call</span>
                        </div>
                        <div className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                            <div className="h-5 w-5 sm:h-6 sm:w-6 bg-amber-100 dark:bg-amber-900/30 text-amber-500 flex items-center justify-center rounded-md">
                                <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </div>
                            <span className="text-[8px] sm:text-[10px]">Email</span>
                        </div>
                        <div className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                            <div className="h-5 w-5 sm:h-6 sm:w-6 bg-purple-100 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center rounded-md">
                                <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </div>
                            <span className="text-[8px] sm:text-[10px]">Schedule</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 sm:p-3">
                        <div className="mb-3">
                            <div className="text-[10px] sm:text-xs font-medium mb-1.5">Recent Projects</div>
                            <div className="space-y-2">
                                {[
                                    { name: "Website Redesign", status: "In Progress", completion: 75 },
                                    { name: "Marketing Campaign", status: "Completed", completion: 100 },
                                ].map((project, i) => (
                                    <div
                                        key={i}
                                        className="bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded-md"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[8px] sm:text-[10px] font-medium">
                                                {project.name}
                                            </span>
                                            <span
                                                className={`text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded-full ${
                                                    project.status === "Completed"
                                                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                                }`}
                                            >
                                                {project.status}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full ${
                                                    project.status === "Completed"
                                                        ? "bg-green-500"
                                                        : "bg-amber-500"
                                                }`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${project.completion}%` }}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] sm:text-xs font-medium">Feedback</span>
                                <div className="flex items-center space-x-0.5">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <Star
                                            key={rating}
                                            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                                                rating <= 4
                                                    ? "text-amber-400 fill-amber-400"
                                                    : "text-neutral-300 dark:text-neutral-700"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded-md">
                                <div className="text-[8px] sm:text-[9px] text-neutral-600 dark:text-neutral-400 italic">
                                    "Great team to work with! They understand our needs quickly
                                    and delivered high-quality work ahead of schedule."
                                </div>
                                <div className="mt-1 text-right text-[7px] sm:text-[8px] text-neutral-500">
                                    - Project Manager, May 15
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] sm:text-xs font-medium mb-1.5">
                                Custom Portal
                            </div>
                            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded-md flex items-center justify-between">
                                <div className="text-[8px] sm:text-[10px]">
                                    <div className="font-medium">Client Portal</div>
                                    <div className="text-neutral-500">
                                        Custom branded experience
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <motion.button
                                        className="text-[7px] sm:text-[8px] px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Settings
                                    </motion.button>
                                    <motion.button
                                        className="text-[7px] sm:text-[8px] px-2 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Open
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}; 