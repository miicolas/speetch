import React from "react";
import { getProject } from "@/actions/(member)/get-project/action";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Project } from "@/lib/types/project-type";
import { getPayment } from "@/actions/(member)/get-payment/action";
import { Payment } from "@/lib/types/payment-type";
import { getSteps } from "@/actions/(member)/get-steps/action";
import { Step } from "@/lib/types/project-type";

import { ProjectHeader } from "./_id/project-header";
import { ProjectProgress } from "./_id/project-progress";
import { ProjectDetails } from "./_id/project-details";
import { ProjectContact } from "./_id/project-contact";
import { ProjectSteps } from "./_id/project-steps";
import { ProjectPayment } from "./_id/project-payment";
import { ProjectFAQ } from "./_id/project-faq";
import { ProjectFooter } from "./_id/project-footer";
import { getStatusDetails } from "@/lib/utils/project-status";
import {
    getPaymentStatusDetails,
    getPaymentMethodDetails,
} from "@/lib/utils/payment-status";
import { getProjectContact } from "@/actions/(member)/get-project-contact/action";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const projectData = await getProject({ projectId: id[0] });
    const paymentData = await getPayment({ projectId: id[0] });
    const stepsData = await getSteps({ projectId: id[0] });
    const projectContact = await getProjectContact({ projectId: id[0] });

    console.log(projectContact, "projectContact");

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
                    {projectContact.content && (
                        <ProjectContact projectContact={projectContact.content} />
                    )}
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
