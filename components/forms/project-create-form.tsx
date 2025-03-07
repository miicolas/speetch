"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Euro, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/lib/types/client-type";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    amount: z
        .number()
        .min(0, {
            message: "Amount must be at least 0.",
        })
        .max(1000000, {
            message: "Amount must be less than 1,000,000.",
        }),
    status: z.enum(["not_started", "pending", "done", "failed"]),
    end_date: z.date(),
    client_id: z
        .string()
        .includes("No clients found. Please add a client first."),
    payment_date: z.date(),
    payment_method: z.string(),
});

export function CreateProjectForm({ clients }: { clients: Client[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            amount: 0,
            status: "not_started",
            end_date: new Date(),
            client_id: "",
            payment_date: new Date(),
            payment_method: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Create a new project</CardTitle>
                <CardDescription>
                    Fill in the details to create a new project
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">
                                    Main project details
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Fill in the details for the project
                                </p>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Website for client X"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="not_started">
                                                        Not started
                                                    </SelectItem>
                                                    <SelectItem value="pending">
                                                        In progress
                                                    </SelectItem>
                                                    <SelectItem value="done">
                                                        Done
                                                    </SelectItem>
                                                    <SelectItem value="failed">
                                                        Failed
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="sm:col-span-2">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Detailed description of the project and its objectives"
                                                    className="resize-none min-h-[120px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">
                                    Client and deadlines
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Information about the client and deadlines
                                </p>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="client_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Client</FormLabel>
                                            {clients.length === 0 ? (
                                                <Input
                                                    value="No clients found. Please add a client first."
                                                    disabled
                                                />
                                            ) : (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a client" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {clients.map(
                                                            (client) => (
                                                                <SelectItem
                                                                    key={
                                                                        client.id
                                                                    }
                                                                    value={
                                                                        client.id
                                                                    }
                                                                >
                                                                    {
                                                                        client.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="end_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "dd/MM/yyyy"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Choose a
                                                                    date
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        disabled={(date) =>
                                                            date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">
                                    Payment information
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Details on the project payment
                                </p>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        placeholder="0.00"
                                                        className="pl-8"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                parseFloat(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <Euro className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="payment_method"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Payment method
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a payment method" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1_payment">
                                                        Single payment
                                                    </SelectItem>
                                                    <SelectItem value="2_payments">
                                                        Two payments
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="payment_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "dd/MM/yyyy"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Choose a
                                                                    date
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    form.formState.isSubmitting ||
                                    !form.formState.isValid
                                }
                                className={`cursor-pointer ${
                                    form.formState.isSubmitting ||
                                    !form.formState.isValid
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {form.formState.isSubmitting ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    "Create project"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
