"use client";
import { Step } from "@/lib/types/project-type";
import { AddStepsForm } from "@/components/forms/add-steps-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    PenLine,
    Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStepStatusDetails } from "@/lib/utils/project-status";

export function StepsProject({
    steps,
    projectId,
}: {
    steps: Step[];
    projectId: string;
}) {
    return (
        <div className="space-y-6">
            {steps && steps.length > 0 ? (
                <div className="relative">
                    <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-border" />

                    <div className="space-y-8">
                        {steps.map((step) => {
                            const statusInfo = getStepStatusDetails(step.status);
                            const StatusIcon = statusInfo.icon;

                            return (
                                <div key={step.id} className="relative">
                                    <div className="flex items-start ml-8 relative">
                                        <div
                                            className={cn(
                                                "absolute -left-8 rounded-full p-1",
                                                step.status === "completed"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            <StatusIcon className="h-5 w-5" />
                                        </div>

                                        <Card className="w-full hover:shadow-md transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-2">
                                                        <h3 className="font-medium text-lg">
                                                            {step.name}
                                                        </h3>
                                                        <p className="text-muted-foreground">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            statusInfo.bgColor,
                                                            statusInfo.textColor,
                                                            statusInfo.borderColor
                                                        )}
                                                    >
                                                        {statusInfo.label}
                                                    </Badge>
                                                </div>

                                                <div className="flex justify-end gap-2 mt-4">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8"
                                                    >
                                                        <PenLine className="h-3.5 w-3.5 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">
                        No steps defined for this project.
                    </p>
                </div>
            )}

            <div className="pt-4 flex justify-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add a step
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add a step</DialogTitle>
                            <DialogDescription>
                                Define a new step for your project. Steps help
                                you track progress and organize your work.
                            </DialogDescription>
                        </DialogHeader>
                        <AddStepsForm projectId={projectId} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
