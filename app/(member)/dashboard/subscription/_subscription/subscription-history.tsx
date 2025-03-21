"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Table, TableBody, TableCell, TableHead, 
    TableHeader, TableRow 
} from "@/components/ui/table";
import { getSubscriptionHistory } from "@/actions/(stripe)/get-subscription-history/action";
import { toast } from "sonner";
import { FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

interface SubscriptionHistoryProps {
    userId: string;
    stripeCustomerId: string;
}

interface PaymentHistory {  
    id: string;
    amount: number;
    currency: string;
    status: string;
    date: string;
    receiptUrl?: string;
}

export default function SubscriptionHistory({ userId, stripeCustomerId }: SubscriptionHistoryProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState<PaymentHistory[]>([]);

    useEffect(() => {
        async function fetchHistory() {
            if (!stripeCustomerId) {
                setIsLoading(false);
                return;
            }

            try {
                const result = await getSubscriptionHistory({
                    stripeCustomerId,
                    userId,
                    limit: 10
                });

                if (result.status === "success" && result.content) {
                    setHistory(result.content as PaymentHistory[]);
                } else {
                    console.error("Error when retrieving payment history", result.message);
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Unable to load payment history");
            } finally {
                setIsLoading(false);
            }
        }

        fetchHistory();
    }, [userId, stripeCustomerId]);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
        }).format(amount / 100);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "succeeded":
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Succeeded</span>;
            case "failed":
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Failed</span>;
            case "pending":
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment history</CardTitle>
                <CardDescription>
                    Payment history related to your subscription
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No payment history available</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Receipt</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell className="font-medium">
                                        {new Date(payment.date).toLocaleDateString('en-US')}
                                        <div className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(payment.date), { 
                                                addSuffix: true,
                                                locale: enUS
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(payment.amount, payment.currency)}
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(payment.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {payment.receiptUrl ? (
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => window.open(payment.receiptUrl, '_blank')}
                                            >
                                                <FileText className="h-4 w-4 mr-1" />
                                                Receipt
                                            </Button>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
} 