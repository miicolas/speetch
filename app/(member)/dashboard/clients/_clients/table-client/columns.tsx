"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/lib/types/client-type";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowUpDown,
    Eye,
    Pencil,
    Trash2,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Client>[] = [
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
        accessorKey: "email",
        header: () => (
            <div className="flex items-center">
                <span>Email</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{row.getValue("email")}</span>
            </div>
        ),
    },
    {
        accessorKey: "phone",
        header: () => (
            <div className="flex items-center">
                <span>Phone</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{row.getValue("phone")}</span>
            </div>
        ),
    },
    {
        accessorKey: "type",
        header: () => (
            <div className="flex items-center">
                <span>Type</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const type = row.getValue("type") as string;
            return (
                <Badge
                    variant={type === "company" ? "default" : "secondary"}
                    className="whitespace-nowrap"
                >
                    {type === "company" ? "Entreprise" : "Particulier"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "city",
        header: () => (
            <div className="flex items-center">
                <span>City</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{row.getValue("city")}</span>
            </div>
        ),
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
                                    href={`/dashboard/clients/${row.original.id}`}
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
                                    href={`/dashboard/clients/${row.original.id}/edit`}
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
