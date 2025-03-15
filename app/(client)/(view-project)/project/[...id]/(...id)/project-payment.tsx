import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ProjectPaymentProps } from "@/lib/types/project-view-types";

export function ProjectPayment({
    project,
    payments,
    paymentMethodInfo,
}: ProjectPaymentProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">Payment method</CardTitle>
                <CardDescription>
                    {project.paymentMethod === "1_payment"
                        ? "Single payment"
                        : `Payment in ${project.paymentMethod?.charAt(0) || "1"} times`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Total amount
                        </span>
                        <span className="font-semibold">
                            {project.amount} €
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Payment method:
                        </span>
                        <span className="font-semibold">
                            {paymentMethodInfo.label}
                        </span>
                    </div>
                </div>

                {!payments || payments.length === 0 ? (
                    <div className="text-center p-4 bg-muted rounded-md">
                        <p className="text-muted-foreground">
                            No payment has been configured for this project yet.
                        </p>
                    </div>
                ) : (
                    <>
                        {payments.length > 1 && (
                            <h3 className="text-sm font-medium mb-4">
                                Payment schedule
                            </h3>
                        )}

                        <div className="space-y-4">
                            {payments.map((payment, index) => (
                                <div
                                    key={payment.id || index}
                                    className="border rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <p className="font-medium">
                                                {payments.length > 1
                                                    ? `Payment ${index + 1}/${payments.length}`
                                                    : "Payment"}
                                            </p>
                                            {payments.length > 1 && (
                                                <p className="text-sm text-muted-foreground">
                                                    {Math.round(
                                                        project.amount /
                                                            payments.length
                                                    )}{" "}
                                                    €
                                                </p>
                                            )}
                                        </div>
                                        <Badge
                                            variant={
                                                payment.status === "paid"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {payment.status === "paid"
                                                ? "Paid"
                                                : "Pending"}
                                        </Badge>
                                    </div>

                                    {payment.status !== "paid" &&
                                        payment.url && (
                                            <div className="flex justify-end mt-2">
                                                <Button size="sm" asChild>
                                                    <Link href={payment.url}>
                                                        <CreditCard className="h-4 w-4 mr-2" />
                                                        Make payment
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
