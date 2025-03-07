"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@/lib/types/project-type";

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "client",
        header: "Client",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "status",
        header: "Statut",
    },
    {
        accessorKey: "paymentDate",
        header: "Payment Date",
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
    },
];
