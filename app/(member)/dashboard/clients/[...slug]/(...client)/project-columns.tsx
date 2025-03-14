"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@/lib/types/project-type";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowUpDown,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Euro,
    CreditCard,
} from "lucide-react";

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: () => (
            <div className="flex items-center">
                <span>Nom</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="font-medium">
                <Link href={`/dashboard/projects/${row.original.id}`} className="hover:underline">
                    {row.getValue("name")}
                </Link>
            </div>
        ),
    },
    {
        accessorKey: "amount",
        header: () => (
            <div className="flex items-center">
                <span>Montant</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                <Euro className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                    {typeof row.getValue("amount") === "number"
                        ? `${row.getValue("amount")} €`
                        : row.getValue("amount")}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => (
            <div className="flex items-center">
                <span>Statut</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            const getStatusDetails = (status: string) => {
                switch (status) {
                    case "not_started":
                        return {
                            label: "Non démarré",
                            variant: "outline",
                            icon: Clock,
                        };
                    case "pending":
                        return {
                            label: "En cours",
                            variant: "secondary",
                            icon: AlertCircle,
                        };
                    case "done":
                        return {
                            label: "Terminé",
                            variant: "default",
                            icon: CheckCircle,
                        };
                    case "failed":
                        return {
                            label: "Échoué",
                            variant: "destructive",
                            icon: XCircle,
                        };
                    default:
                        return {
                            label: status,
                            variant: "outline",
                            icon: Clock,
                        };
                }
            };

            const { label, variant, icon: Icon } = getStatusDetails(status);

            return (
                <Badge
                    variant={variant as "default" | "destructive" | "outline" | "secondary"}
                    className="flex items-center gap-1 whitespace-nowrap"
                >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{label}</span>
                </Badge>
            );
        },
    },
    {
        accessorKey: "paymentStatus",
        header: () => (
            <div className="flex items-center">
                <span>Paiement</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const status =
                (row.getValue("paymentStatus") as string) || "pending";

            const getStatusDetails = (status: string) => {
                switch (status) {
                    case "paid":
                        return { label: "Payé", variant: "default" };
                    case "pending":
                        return { label: "En attente", variant: "secondary" };
                    case "overdue":
                        return { label: "En retard", variant: "destructive" };
                    default:
                        return { label: status, variant: "outline" };
                }
            };

            const { label, variant } = getStatusDetails(status);

            return (
                <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <Badge
                        variant={variant as "default" | "destructive" | "outline" | "secondary"}
                        className="whitespace-nowrap"
                    >
                        {label}
                    </Badge>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                >
                    <Link href={`/dashboard/projects/${row.original.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                    </Link>
                </Button>
            );
        },
    },
]; 