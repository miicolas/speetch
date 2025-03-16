"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function BigCalendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: React.ComponentProps<typeof DayPicker>) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-6 bg-white rounded-xl", className)}
            classNames={{
                months: "flex flex-col sm:flex-row gap-6",
                month: "flex flex-col gap-6",
                caption:
                    "flex justify-center pt-3 pb-2 relative items-center w-full",
                caption_label: "text-base font-medium tracking-wide",
                nav: "flex items-center gap-2",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "size-8 bg-white border border-gray-100 rounded-lg p-0 opacity-80 hover:opacity-100 hover:bg-gray-50 transition-all"
                ),
                nav_button_previous: "absolute left-2",
                nav_button_next: "absolute right-2",
                table: "w-full border-collapse space-y-1",
                head_row: "flex gap-1 mb-2",
                head_cell: "text-gray-500 font-medium rounded-md w-10 text-sm",
                row: "flex w-full gap-1 mb-1",
                cell: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                    props.mode === "range"
                        ? "[&:has(>.day-range-end)]:rounded-r-lg [&:has(>.day-range-start)]:rounded-l-lg first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg"
                        : "[&:has([aria-selected])]:rounded-lg"
                ),
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "size-10 p-0 font-normal rounded-lg hover:bg-gray-50 aria-selected:opacity-100 transition-colors"
                ),
                day_range_start:
                    "day-range-start aria-selected:bg-indigo-600 aria-selected:text-white",
                day_range_end:
                    "day-range-end aria-selected:bg-indigo-600 aria-selected:text-white",
                day_selected:
                    "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white shadow-sm",
                day_today:
                    "bg-gray-50 text-indigo-600 font-medium border border-gray-100",
                day_outside:
                    "day-outside text-gray-300 hover:bg-transparent hover:text-gray-300",
                day_disabled: "text-gray-300 opacity-50",
                day_range_middle:
                    "aria-selected:bg-indigo-50 aria-selected:text-indigo-900",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ className, ...props }) => (
                    <ChevronLeft
                        className={cn("size-4 stroke-2", className)}
                        {...props}
                    />
                ),
                IconRight: ({ className, ...props }) => (
                    <ChevronRight
                        className={cn("size-4 stroke-2", className)}
                        {...props}
                    />
                ),
            }}
            {...props}
        />
    );
}

export { BigCalendar };
