"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/lib/types/client-type";

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "status",
        header: "Status",
    }, 

];
