"use client";

import { useState, useEffect, useCallback } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { cancelSubscription } from "@/actions/(stripe)/cancel-subscription/action";
import { createUpdatePaymentSession } from "@/actions/(stripe)/update-payment-method/action";
import { createManageSubscriptionSession } from "@/actions/(stripe)/manage-subscription/action";
import { ChevronDown, CreditCard, Settings, AlertTriangle } from "lucide-react";
import { checkUpdatedSubscription } from "@/actions/(stripe)/check-updated-subscription/action";

interface SubscriptionActionsProps {
    currentPlan: string;
    status: string;
    userId: string;
    stripeCustomerId: string;
}

export default function SubscriptionActions({
    currentPlan,
    status,
    userId,
    stripeCustomerId,
}: SubscriptionActionsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

    const checkSubscriptionUpdate = useCallback(async () => {
        if (!stripeCustomerId) {
            toast.error("Missing Stripe customer information");
            return;
        }

        setIsLoading(true);
        try {
            const result = await checkUpdatedSubscription({
                stripeCustomerId,
            });

            if (result.status === "success") {
                toast.success("Subscription updated successfully");

                router.refresh();

                const content = result.content as {
                    plan: string;
                    role: string;
                };
                if (content?.plan && content?.role) {
                    toast.info(
                        `Your plan is now: ${content.plan.toUpperCase()} (Role: ${content.role})`
                    );
                }
            }
        } catch (error) {
            console.error("Error when checking subscription:", error);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [stripeCustomerId, router]);

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");

        const shouldCheckSubscription = sessionStorage.getItem(
            "checkSubscriptionOnReturn"
        );

        if (success === "true" || shouldCheckSubscription === "true") {
            sessionStorage.removeItem("checkSubscriptionOnReturn");
            checkSubscriptionUpdate();
            console.log("Checking subscription");
        } else if (canceled === "true") {
            toast.info("The subscription update has been cancelled");
        }
    }, [searchParams, checkSubscriptionUpdate]);

    const handleCancelSubscription = async () => {
        if (!stripeCustomerId) {
            toast.error("Missing Stripe customer information");
            return;
        }

        setIsLoading(true);
        try {
            const result = await cancelSubscription({
                stripeCustomerId,
                userId,
            });

            if (result.status === "success") {
                toast.success("Subscription cancelled successfully");
                checkSubscriptionUpdate();
                router.refresh();
            } else {
                toast.error(
                    `Error: ${result.message || "Unable to cancel subscription"}`
                );
            }
        } catch (error) {
            console.error("Error when cancelling:", error);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
            setShowCancelDialog(false);
        }
    };

    const handleUpdatePaymentMethod = async () => {
        setIsLoading(true);
        try {
            // Préparer une URL de retour qui inclut le paramètre success=true
            const currentUrl = window.location.href;
            const returnUrl = currentUrl.includes("?")
                ? `${currentUrl}&success=true`
                : `${currentUrl}?success=true`;

            const result = await createUpdatePaymentSession({
                stripeCustomerId,
                returnUrl,
            });

            if (result.status === "success" && result.content) {
                const url = (result.content as { url: string }).url;

                if (url) {
                    sessionStorage.setItem("checkSubscriptionOnReturn", "true");
                    window.location.href = url;
                }
            } else {
                toast.error(
                    `Error: ${result.message || "Unable to update payment method"}`
                );
            }
        } catch (error) {
            console.error("Error when updating:", error);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpgradeSubscription = async () => {
        setIsLoading(true);
        try {
            const currentUrl = window.location.href;
            const returnUrl = currentUrl.includes("?")
                ? `${currentUrl}&success=true`
                : `${currentUrl}?success=true`;

            const result = await createManageSubscriptionSession({
                stripeCustomerId,
                returnUrl,
            });

            if (result.status === "success" && result.content) {
                const url = (result.content as { url: string }).url;

                if (url) {
                    sessionStorage.setItem("checkSubscriptionOnReturn", "true");
                    window.location.href = url;
                }
            } else {
                toast.error(
                    `Error: ${result.message || "Unable to manage subscription"}`
                );
            }
        } catch (error) {
            console.error("Error when updating:", error);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
            setShowUpgradeDialog(false);
        }
    };

    if (!currentPlan || status !== "active") {
        return (
            <Button
                onClick={() => router.push("/pricing")}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
                Subscribe
            </Button>
        );
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                        Options <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => setShowUpgradeDialog(true)}
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Upgrade
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleUpdatePaymentMethod}
                        disabled={isLoading}
                    >
                        <CreditCard className="h-4 w-4 mr-2" />
                        {isLoading ? "Loading..." : "Update payment method"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setShowCancelDialog(true)}
                        className="text-destructive focus:text-destructive"
                    >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Cancel subscription
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={showUpgradeDialog}
                onOpenChange={setShowUpgradeDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upgrade your subscription</DialogTitle>
                        <DialogDescription>
                            You will be redirected to the Stripe interface to
                            manage your subscription.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowUpgradeDialog(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpgradeSubscription}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Continue"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={showCancelDialog}
                onOpenChange={setShowCancelDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to cancel your subscription?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Your subscription will be cancelled at the end of
                            the current billing period. You will lose access to
                            premium features at this date.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancelSubscription}
                            disabled={isLoading}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {isLoading
                                ? "Cancelling..."
                                : "Confirm cancellation"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
