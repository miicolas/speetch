"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@/lib/types/project-type";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowUpDown,
    Eye,
    Pencil,
    Trash2,
    MoreHorizontal,
    Calendar,
    CreditCard,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPaymentStatusDetails } from "@/lib/utils/payment-status";
import { getStatusDetails } from "@/lib/utils/project-status";

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: () => (
            <div className="flex items-center">
                <span>Name</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "client_id",
        header: () => (
            <div className="flex items-center">
                <span>Client</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const clientName = row.original.client?.name || "Inconnu";
            return (
                <div className="text-left">
                    <Badge variant="outline" className="whitespace-nowrap">
                        {clientName}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "amount",
        header: () => (
            <div className="flex items-center">
                <span>Amount</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-left">
                {typeof row.getValue("amount") === "number"
                    ? `${row.getValue("amount")} €`
                    : row.getValue("amount")}
            </div>
        ),
    },
    {
        accessorKey: "paymentDate",
        header: () => (
            <div className="flex items-center">
                <span>Payment Date</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const date = row.original.paymentDate;
            if (!date)
                return <span className="text-muted-foreground">Undefined</span>;

            return (
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(date).toLocaleDateString("fr-FR")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: () => (
            <div className="flex items-center">
                <span>Status</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            const { label, variant, icon: Icon } = getStatusDetails(status);

            return (
                <div className="flex justify-start w-full">
                    <Badge
                        variant={
                            variant as
                                | "default"
                                | "destructive"
                                | "outline"
                                | "secondary"
                        }
                        className="flex items-center gap-1 whitespace-nowrap"
                    >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{label}</span>
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "paymentStatus",
        header: () => (
            <div className="flex items-center">
                <span>Payment Status</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const status =
                (row.getValue("paymentStatus") as string) || "pending";

            const statusDetails = getPaymentStatusDetails(status);

            return (
                <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <Badge
                        variant={statusDetails.variant}
                        className="whitespace-nowrap"
                    >
                        {statusDetails.label}
                    </Badge>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        row.original.id
                                    )
                                }
                                className="cursor-pointer"
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link
                                    href={`/dashboard/projects/${row.original.id}`}
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>View</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link
                                    href={`/dashboard/projects/${row.original.id}/edit`}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
