"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

interface PaymentDateUpdateProps {
    currentPaymentDate: Date | null;
    onUpdate: (paymentDate: Date) => Promise<boolean>;
}

export function PaymentDateUpdate({
    currentPaymentDate,
    onUpdate,
}: PaymentDateUpdateProps) {
    const [date, setDate] = useState<Date | undefined>(
        currentPaymentDate ? new Date(currentPaymentDate) : undefined
    );
    const [isUpdating, setIsUpdating] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const formattedDate = date
        ? format(date, "dd MMMM yyyy", { locale: fr })
        : "Non définie";

    const handleDateChange = async (selectedDate: Date | undefined) => {
        if (!selectedDate) return;

        setDate(selectedDate);
        setIsUpdating(true);
        setIsOpen(false);

        try {
            const success = await onUpdate(selectedDate);
            if (success) {
                toast.success("Payment date updated successfully");
            } else {
                toast.error("Error during update the payment date");
                setDate(
                    currentPaymentDate
                        ? new Date(currentPaymentDate)
                        : undefined
                );
            }
        } catch (error) {
            console.error("error", error);
            toast.error("Error during update the payment date");
            setDate(
                currentPaymentDate ? new Date(currentPaymentDate) : undefined
            );
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        disabled={isUpdating}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Update payment date</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                        locale={fr}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
