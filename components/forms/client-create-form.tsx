"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
    Euro,
    Loader2,
    Check,
    Building2,
    MapPin,
    Globe,
    Phone,
    Mail,
    User2,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { addClient } from "@/actions/(member)/add-client/action";
const countries = [
    { value: "fr", label: "France" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "es", label: "Spain" },
    { value: "it", label: "Italy" },
    { value: "ca", label: "Canada" },
    { value: "be", label: "Belgium" },
    { value: "nl", label: "Netherlands" },
    { value: "ch", label: "Switzerland" },
    { value: "at", label: "Austria" },
    { value: "se", label: "Sweden" },
    { value: "no", label: "Norway" },
    { value: "dk", label: "Denmark" },
    { value: "fi", label: "Finland" },
    { value: "ie", label: "Ireland" },
    { value: "pt", label: "Portugal" },
    { value: "gr", label: "Greece" },
    { value: "ro", label: "Romania" },
    { value: "hu", label: "Hungary" },
    { value: "pl", label: "Poland" },
    { value: "cz", label: "Czech Republic" },
    { value: "sk", label: "Slovakia" },
    { value: "bg", label: "Bulgaria" },
    { value: "hr", label: "Croatia" },
    { value: "rs", label: "Serbia" },
    { value: "si", label: "Slovenia" },
    { value: "tr", label: "Turkey" },
    { value: "ua", label: "Ukraine" },
    { value: "vn", label: "Vietnam" },
    { value: "za", label: "South Africa" },
    { value: "mx", label: "Mexico" },
    { value: "ar", label: "Argentina" },
    { value: "br", label: "Brazil" },
    { value: "cl", label: "Chile" },
    { value: "co", label: "Colombia" },
    { value: "ec", label: "Ecuador" },
].sort((a, b) => a.label.localeCompare(b.label));

const clientTypes = [
    { value: "company", label: "Company" },
    { value: "individual", label: "Individual" },
    { value: "non_profit", label: "Non-profit" },
    { value: "government", label: "Government" },
];

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    type: z.string({
        required_error: "Please select a client type.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    phone: z
        .string()
        .min(10, {
            message: "Phone number must be at least 10 characters.",
        })
        .regex(/^[+\d\s()-]+$/, {
            message: "Phone number can only contain digits, spaces, +, -, (, )",
        }),

    address: z.string().min(2, {
        message: "Address must be at least 2 characters.",
    }),
    state: z.string().min(2, {
        message: "State must be at least 2 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
    zip: z.string().min(2, {
        message: "Zip must be at least 2 characters.",
    }),
    country: z.string({
        required_error: "Please select a country.",
    }),

    website: z
        .string()
        .url({
            message: "Invalid website URL.",
        })
        .optional()
        .or(z.literal("")),
    notes: z.string().optional(),
    vatNumber: z.string().optional(),

    contactName: z
        .string()
        .min(2, {
            message: "Contact name must be at least 2 characters.",
        })
        .optional(),
    contactEmail: z
        .string()
        .email({
            message: "Invalid contact email address.",
        })
        .optional(),
    contactPhone: z.string().optional(),
    contactPosition: z.string().optional(),
});

const steps = [
    { id: "general", title: "Informations générales" },
    { id: "address", title: "Adresse" },
    { id: "additional", title: "Informations complémentaires" },
];

export function CreateClientForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState<string>("general");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "company",
            email: "",
            phone: "",
            address: "",
            state: "",
            city: "",
            zip: "",
            country: "fr",
            website: "",
            notes: "",
            vatNumber: "",
            contactName: "",
            contactEmail: "",
            contactPhone: "",
            contactPosition: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {

            const addClientAction = await addClient({
                name: values.name,
                type: values.type,
                email: values.email,
                phone: values.phone,
                address: values.address,
                state: values.state,
                city: values.city,
                zip: values.zip,
                country: values.country,
                website: values.website || "",
                notes: values.notes || "",
                vatNumber: values.vatNumber || "",
                contactName: values.contactName || "",
                contactEmail: values.contactEmail || "",
                contactPhone: values.contactPhone || "",
                contactPosition: values.contactPosition || "",
            });

            if (addClientAction.status === "success") {
                toast.success("Client créé avec succès.");
                form.reset();
            } else {
                toast.error("Une erreur est survenue lors de la création du client.");
            }

            form.reset();
        } catch (error) {
            console.error(error);
            toast.error(
                "Une erreur est survenue lors de la création du client."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    const watchedType = form.watch("type");

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl">
                            Create a new client
                        </CardTitle>
                        <CardDescription>
                            Fill in the details to create a new client
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="mb-8">
                            <div className="flex justify-between">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="flex items-center">
                                            {index > 0 && (
                                                <div
                                                    className={`h-[2px] w-24 lg:w-32 ${
                                                        steps.findIndex(
                                                            (s) =>
                                                                s.id ===
                                                                currentStep
                                                        ) >= index
                                                            ? "bg-primary"
                                                            : "bg-gray-200 dark:bg-gray-700"
                                                    }`}
                                                ></div>
                                            )}
                                            <div
                                                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                                                    currentStep === step.id
                                                        ? "bg-primary text-primary-foreground"
                                                        : steps.findIndex(
                                                                (s) =>
                                                                    s.id ===
                                                                    currentStep
                                                            ) > index
                                                          ? "bg-primary/80 text-primary-foreground"
                                                          : "bg-gray-200 dark:bg-gray-700 text-muted-foreground"
                                                }`}
                                                onClick={() =>
                                                    setCurrentStep(step.id)
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                {index + 1}
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div
                                                    className={`h-[2px] w-24 lg:w-32 ${
                                                        steps.findIndex(
                                                            (s) =>
                                                                s.id ===
                                                                currentStep
                                                        ) > index
                                                            ? "bg-primary"
                                                            : "bg-gray-200 dark:bg-gray-700"
                                                    }`}
                                                ></div>
                                            )}
                                        </div>
                                        <span className="text-sm mt-2">
                                            {step.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {currentStep === "general" && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium">
                                        General informations
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Fill in the basic information of the
                                        client
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center">
                                                        <Building2 className="h-4 w-4 mr-2" />
                                                        Client name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="ACME Corporation"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Client type
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {clientTypes.map(
                                                                (type) => (
                                                                    <SelectItem
                                                                        key={
                                                                            type.value
                                                                        }
                                                                        value={
                                                                            type.value
                                                                        }
                                                                    >
                                                                        {
                                                                            type.label
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center">
                                                    <Mail className="h-4 w-4 mr-2" />
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="contact@company.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center">
                                                    <Phone className="h-4 w-4 mr-2" />
                                                    Phone
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="+33 6 12 34 56 78"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center">
                                                    <Globe className="h-4 w-4 mr-2" />
                                                    Website
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://www.example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === "address" && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2 flex items-center">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        Address details
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Fill in the address details of the
                                        client
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="123 Business Street"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Paris"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Region/Department
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Île-de-France"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="zip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Postal code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="75001"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a country" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {countries.map(
                                                            (country) => (
                                                                <SelectItem
                                                                    key={
                                                                        country.value
                                                                    }
                                                                    value={
                                                                        country.value
                                                                    }
                                                                >
                                                                    {
                                                                        country.label
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === "additional" && (
                            <div className="space-y-6">
                                <div className="border rounded-lg p-4">
                                    <h3 className="text-lg font-medium mb-2 flex items-center">
                                        <User2 className="h-5 w-5 mr-2" />
                                        Main contact
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Add the details of your main contact at
                                        this client
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="contactName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Contact name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="John Doe"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="contactPosition"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Contact position
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Project manager"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="contactEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Contact email
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="john.doe@company.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="contactPhone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Contact phone
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="+33 6 12 34 56 78"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <h3 className="text-lg font-medium mb-2 flex items-center">
                                        <Euro className="h-5 w-5 mr-2" />
                                        Financial information
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                                        <FormField
                                            name="vatNumber"
                                            render={({ field }) => (
                                                <FormItem className="h-full">
                                                    <FormLabel>
                                                        VAT number
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="FR12345678901"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Additional information about this client..."
                                                    className="min-h-32"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <Separator />

                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <Badge
                                    variant={
                                        watchedType === "company"
                                            ? "default"
                                            : watchedType === "individual"
                                              ? "secondary"
                                              : "outline"
                                    }
                                >
                                    {clientTypes.find(
                                        (t) => t.value === watchedType
                                    )?.label || "Client"}
                                </Badge>
                            </div>

                            <div className="flex space-x-4">
                                {currentStep !== "general" && (
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => {
                                            const currentIndex =
                                                steps.findIndex(
                                                    (s) => s.id === currentStep
                                                );
                                            if (currentIndex > 0) {
                                                setCurrentStep(
                                                    steps[currentIndex - 1].id
                                                );
                                            }
                                        }}
                                    >
                                        Previous
                                    </Button>
                                )}

                                {currentStep !== "additional" ? (
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            const currentIndex =
                                                steps.findIndex(
                                                    (s) => s.id === currentStep
                                                );
                                            if (
                                                currentIndex <
                                                steps.length - 1
                                            ) {
                                                setCurrentStep(
                                                    steps[currentIndex + 1].id
                                                );
                                            }
                                        }}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        /* disabled={
                                            isSubmitting ||
                                            !form.formState.isValid
                                        } */
                                        className="min-w-32"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="mr-2 h-4 w-4" />
                                                Create client
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
