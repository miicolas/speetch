import React from "react";
import { getProject } from "@/actions/(member)/get-project/action";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Project } from "@/lib/types/project-type";
import { getPayment } from "@/actions/(member)/get-payment/action";
import { Payment } from "@/lib/types/payment-type";
import { getSteps } from "@/actions/(member)/get-steps/action";
import { Step } from "@/lib/types/project-type";
import {
    StatusInfo,
    PaymentStatusInfo,
    PaymentMethodInfo,
} from "@/lib/types/project-view-types";

import { ProjectHeader } from "./(...id)/project-header";
import { ProjectProgress } from "./(...id)/project-progress";
import { ProjectDetails } from "./(...id)/project-details";
import { ProjectContact } from "./(...id)/project-contact";
import { ProjectSteps } from "./(...id)/project-steps";
import { ProjectPayment } from "./(...id)/project-payment";
import { ProjectFAQ } from "./(...id)/project-faq";
import { ProjectFooter } from "./(...id)/project-footer";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const projectData = await getProject({ projectId: id[0] });
    const paymentData = await getPayment({ projectId: id[0] });
    const stepsData = await getSteps({ projectId: id[0] });

    if (
        !projectData ||
        projectData.status === "error" ||
        !projectData.content
    ) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-2xl font-bold">Project not found</h1>
                <p className="text-muted-foreground mt-2">
                    The project you are looking for does not exist or you do not
                    have access to it.
                </p>
                <Button className="mt-4" variant="outline" asChild>
                    <Link href="/">Back to home</Link>
                </Button>
            </div>
        );
    }

    const p = projectData.content as Project;
    const payments = paymentData.content as Payment[];
    const steps = stepsData.content as Step[];

    const getProgressPercentage = () => {
        const completedSteps = steps.filter(
            (step: Step) => step.status === "completed"
        );

        const inProgressSteps = steps.filter(
            (step: Step) => step.status === "in progress"
        );

        const totalSteps = steps.length;

        if (totalSteps === 0) return 0;

        const completedPercentage = Math.round(
            (completedSteps.length / totalSteps) * 100
        );

        const inProgressPercentage = Math.round(
            (inProgressSteps.length / totalSteps) * 100
        );

        const progressPercentage =
            completedPercentage + inProgressPercentage / 2;

        return progressPercentage;
    };

    const getStatusDetails = (status: string): StatusInfo => {
        switch (status) {
            case "not_started":
                return {
                    label: "Not started",
                    variant: "outline",
                    icon: Clock,
                    color: "text-gray-500",
                };
            case "pending":
                return {
                    label: "In progress",
                    variant: "secondary",
                    icon: AlertCircle,
                    color: "text-blue-500",
                };
            case "done":
                return {
                    label: "Completed",
                    variant: "default",
                    icon: CheckCircle,
                    color: "text-green-500",
                };
            case "failed":
                return {
                    label: "Failed",
                    variant: "destructive",
                    icon: AlertCircle,
                    color: "text-red-500",
                };
            default:
                return {
                    label: status || "Not defined",
                    variant: "outline",
                    icon: Clock,
                    color: "text-gray-500",
                };
        }
    };

    const getPaymentStatusDetails = (status: string): PaymentStatusInfo => {
        if (!status) return { label: "Not defined", variant: "outline" };

        switch (status) {
            case "paid":
                return { label: "Paid", variant: "default" };
            case "pending":
                return { label: "Pending", variant: "secondary" };
            case "overdue":
                return { label: "Overdue", variant: "destructive" };
            default:
                return { label: status, variant: "outline" };
        }
    };

    const getPaymentMethodDetails = (method: string): PaymentMethodInfo => {
        switch (method) {
            case "1_payment":
                return { label: "Single payment", variant: "default" };
            case "2_payments":
                return { label: "2 payments", variant: "secondary" };
            case "3_payments":
                return { label: "3 payments", variant: "destructive" };
            default:
                return { label: method, variant: "outline" };
        }
    };

    const progressPercentage = getProgressPercentage();
    const statusInfo = getStatusDetails(p.status);
    const paymentStatusInfo = getPaymentStatusDetails(
        p.paymentStatus || "pending"
    );
    const paymentMethodInfo = getPaymentMethodDetails(p.paymentMethod);

    const formattedEndDate = p.endDate
        ? new Date(p.endDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "No date defined";

    const timeDistance = p.endDate
        ? formatDistanceToNow(new Date(p.endDate), {
              addSuffix: true,
              locale: enUS,
          })
        : "No date defined";

    return (
        <div className="container max-w-5xl mx-auto px-4 py-12">
            <div className="flex flex-col space-y-8">
                <ProjectHeader project={p} statusInfo={statusInfo} />

                <ProjectProgress
                    progressPercentage={progressPercentage}
                    statusInfo={statusInfo}
                    formattedEndDate={formattedEndDate}
                    timeDistance={timeDistance}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <ProjectDetails
                        project={p}
                        paymentStatusInfo={paymentStatusInfo}
                    />
                    <ProjectContact />
                </div>

                <ProjectSteps steps={steps} />

                <ProjectPayment
                    project={p}
                    payments={payments}
                    paymentMethodInfo={paymentMethodInfo}
                />

                <ProjectFAQ />

                <ProjectFooter />
            </div>
        </div>
    );
}
