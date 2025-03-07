'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
export default function LinksPayment({
    linksPayment,
}: {
    linksPayment: { url: string, status: string }[];
}) {
    return (
        <div>
            <h1>Links Payment</h1>
            {linksPayment.map((link) => (
                <div key={link.url} className="flex items-center gap-2">
                    <Input type="text" value={link.url} className="w-sm" disabled />
                    <Button asChild>
                        <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ArrowUpRightIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                    <span>{link.status}</span>
                </div>
            ))}
        </div>
    );
}
