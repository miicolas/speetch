"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LinksPayment({
    linksPayment,
}: {
    linksPayment: { url: string; status: string }[];
}) {
    const paid = linksPayment.filter((link) => link.status === "paid");
    const notPaid = linksPayment.filter((link) => link.status !== "paid");

    if (linksPayment.length === 0) {
        return (
            <div className="text-center text-sm text-muted-foreground">
                No payment link generated
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {notPaid.map((link, index) => (
                <div
                    key={link.url}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                >
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Payment #{index + 1}</span>
                        <Badge variant="secondary">Pending</Badge>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8" asChild>
                        <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ArrowUpRightIcon className="w-4 h-4 mr-1" />
                            Pay
                        </Link>
                    </Button>
                </div>
            ))}
            {paid.map((link, index) => (
                <div
                    key={link.url}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                >
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Payment #{index + 1}</span>
                        <Badge
                            variant="default"
                            className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        >
                            Paid
                        </Badge>
                    </div>
                </div>
            ))}
        </div>
    );
}
