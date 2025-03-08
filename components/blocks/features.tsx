"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FeatureGrid, FeatureCard } from "../ui/feature-grid";
import { Bot, CreditCard, Users, FileText, LifeBuoy, BellRing, CheckCheck, ChevronRight, BarChart, PieChart } from "lucide-react";
import { motion } from "motion/react";

export default function Features() {
  return (
    <FeatureGrid className="mx-auto md:auto-rows-[20rem]">
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
  return (
    <motion.div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", times: [0, 0.5, 1] }}
      >
        <Bot className="h-24 w-24 text-indigo-500 opacity-10" />
      </motion.div>
      
      <motion.div 
        className="z-10 flex flex-col items-center space-y-6 w-full"
      >
        <motion.div
          className="flex items-center space-x-2 bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-md w-3/4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <BellRing className="h-5 w-5 text-red-500" />
          <div className="text-xs">
            <p className="font-semibold text-neutral-700 dark:text-neutral-200">Payment Reminder</p>
            <p className="text-neutral-500">Invoice #3021 is 3 days overdue</p>
          </div>
        </motion.div>
        
        <motion.div
          className="flex items-center space-x-2 bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-md w-3/4"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <CheckCheck className="h-5 w-5 text-green-500" />
          <div className="text-xs">
            <p className="font-semibold text-neutral-700 dark:text-neutral-200">Invoice Generated</p>
            <p className="text-neutral-500">Custom invoice created in 2.3 seconds</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const [paymentOption, setPaymentOption] = useState('split');
  
  return (
    <motion.div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Payment Card */}
        <motion.div 
          className="relative w-52 h-32"
          animate={{ 
            x: paymentOption === 'split' ? -20 : 0,
            rotate: paymentOption === 'split' ? -5 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-4 flex flex-col justify-between"
            animate={{ 
              rotateY: [0, 5, 0, -5, 0],
              y: [0, -2, 0, 2, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded opacity-80" />
              <CreditCard className="h-6 w-6 text-white opacity-80" />
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-white bg-opacity-20 rounded" />
              <div className="flex justify-between">
                <div className="w-20 h-3 bg-white bg-opacity-20 rounded" />
                <div className="w-8 h-3 bg-white bg-opacity-20 rounded" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Payment Options */}
        <motion.div 
          className="absolute right-10 flex flex-col space-y-2"
          animate={{ 
            x: paymentOption === 'split' ? 0 : -20,
            opacity: 1
          }}
          initial={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div
            className={`rounded-lg shadow-md p-2 flex items-center justify-between w-32 text-xs font-medium ${
              paymentOption === 'full' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentOption('full')}
          >
            <span>Full Payment</span>
            {paymentOption === 'full' && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <CheckCheck className="h-3 w-3" />
              </motion.div>
            )}
          </motion.div>
          
          <motion.div
            className={`rounded-lg shadow-md p-2 flex items-center justify-between w-32 text-xs font-medium ${
              paymentOption === 'split' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentOption('split')}
          >
            <span>Split Payment</span>
            {paymentOption === 'split' && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <CheckCheck className="h-3 w-3" />
              </motion.div>
            )}
          </motion.div>
          
          {/* Split Payment Details */}
          {paymentOption === 'split' && (
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-2 space-y-1 w-32"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-neutral-500">Now</span>
                <span className="text-[9px] font-medium text-indigo-600 dark:text-indigo-400">50%</span>
              </div>
              <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 0.7 }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-neutral-500">Later</span>
                <span className="text-[9px] font-medium text-indigo-600 dark:text-indigo-400">50%</span>
              </div>
              <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkeletonThree = () => {
  return (
    <motion.div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center relative"
    >
      <motion.div 
        className="absolute w-3/4 h-4/5 flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-white dark:bg-neutral-800 rounded-t-lg p-3 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center"
        >
          <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Contract_Template.pdf</div>
          <FileText className="h-4 w-4 text-neutral-500" />
        </motion.div>
        
        <motion.div className="bg-neutral-50 dark:bg-neutral-900 flex-1 rounded-b-lg p-3 relative overflow-hidden">
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: ["0%", "-100%"] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "loop" }}
            className="space-y-2"
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div 
                key={i}
                className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full"
                style={{ width: `${Math.random() * 60 + 40}%` }}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="absolute bottom-3 right-3 bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 flex items-center space-x-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
          >
            <CheckCheck className="h-3 w-3 text-green-600 dark:text-green-400" />
            <span className="text-xs text-green-600 dark:text-green-400">Auto-Generated</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const barHeights = [60, 30, 75, 40, 90, 55];
  
  return (
    <motion.div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] p-4"
    >
      <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl w-full h-full p-3 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Client Revenue Dashboard</div>
          <div className="flex space-x-2">
            <PieChart className="h-4 w-4 text-indigo-500" />
            <BarChart className="h-4 w-4 text-purple-500" />
          </div>
        </div>
        
        <div className="flex-1 flex">
          <div className="w-1/2 pr-3 border-r border-neutral-100 dark:border-neutral-800">
            <div className="h-full flex items-end justify-between">
              {barHeights.map((height, i) => (
                <motion.div
                  key={i}
                  className="w-[13%] bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "backOut" }}
                  whileHover={{ opacity: 0.8 }}
                />
              ))}
            </div>
          </div>
          
          <div className="w-1/2 pl-3 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                className="flex items-center space-x-2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className={`h-3 w-3 rounded-full ${i === 1 ? 'bg-indigo-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-pink-500' : 'bg-blue-500'}`} />
                <div className="flex-1 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${i === 1 ? 'bg-indigo-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-pink-500' : 'bg-blue-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(5 - i) * 20}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  return (
    <motion.div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center p-3"
    >
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
          <div className="text-xs text-indigo-500">Project ID: PRJ-2023</div>
        </div>
        
        <div className="flex-1 p-3 flex flex-col space-y-3">
         
          <motion.div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Project Progress</span>
              <motion.span 
                className="text-indigo-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >78%</motion.span>
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
              <span className="text-xs text-neutral-700 dark:text-neutral-300">Payment Status</span>
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
              <span className="text-xs text-neutral-700 dark:text-neutral-300">Next Payment</span>
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
            <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Project Milestones</div>
            <div className="space-y-1.5">
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">Initial Design</span>
                <div className="ml-auto text-xs text-green-500">Completed</div>
              </motion.div>
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">Development Phase</span>
                <div className="ml-auto text-xs text-green-500">Completed</div>
              </motion.div>
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">Testing Phase</span>
                <div className="ml-auto text-xs text-amber-500">In Progress</div>
              </motion.div>
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mr-2"></div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">Final Delivery</span>
                <div className="ml-auto text-xs text-neutral-500">Pending</div>
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
        AI tracks payments and automatically sends reminders to late payers. Generate custom invoices in seconds.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Bot className="h-4 w-4 text-neutral-500" />,
    isNew: true,
    disabled: true,
  },
  {
    title: "Ultra-flexible Payment Solution",
    description: (
      <span className="text-sm">
        Stripe integration for hassle-free payments and transfers. Split payment options allow your clients to pay in installments.
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
        Automatic legal contract generator adapted to local regulations. Calculate your taxes and fees with a single click.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
    isNew: true,
    disabled: true,
  },
  {
    title: "CRM Designed for Freelancers",
    description: (
      <span className="text-sm">
        Intuitive dashboard to manage clients and projects. Automatic analysis of your most profitable clients. Integration with Slack, Notion, and Trello.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Users className="h-4 w-4 text-neutral-500" />,
    isNew: true,
    disabled: true,
  },
  {
    title: "Support & Guidance",
    description: (
      <span className="text-sm">
        Client contact form creation, project calendar, and dashboard to track progress and payments.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <LifeBuoy className="h-4 w-4 text-neutral-500" />,
    isNew: true,
    disabled: true,
  },
];
