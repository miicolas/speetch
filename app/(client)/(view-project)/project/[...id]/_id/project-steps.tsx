import { CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProjectStepsProps } from "@/lib/types/project-view-types";

export function ProjectSteps({ steps }: ProjectStepsProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">Project steps</CardTitle>
                <CardDescription>
                    Detailed project progress tracking
                </CardDescription>
            </CardHeader>
            <CardContent>
                {steps && steps.length > 0 ? (
                    <div className="relative">
                        <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-border" />
                        <div className="space-y-6">
                            {steps.map((step) => (
                                <div key={step.id} className="relative">
                                    <div className="flex items-start ml-8 relative">
                                        <div
                                            className={`absolute -left-8 rounded-full p-1 ${
                                                step.status === "completed"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-muted text-muted-foreground"
                                            }`}
                                        >
                                            {step.status === "completed" ? (
                                                <CheckCircle className="h-5 w-5" />
                                            ) : (
                                                <Clock className="h-5 w-5" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">
                                                        {step.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {step.description}
                                                    </p>
                                                </div>
                                                {step.status === "completed" ? (
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-green-50 text-green-700 border-green-200"
                                                    >
                                                        Completed
                                                    </Badge>
                                                ) : step.status ===
                                                  "in progress" ? (
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-blue-50 text-blue-700 border-blue-200"
                                                    >
                                                        In progress
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-gray-50 text-gray-500 border-gray-200"
                                                    >
                                                        Not started
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-4 bg-muted rounded-md">
                        <p className="text-muted-foreground">
                            No steps have been defined for this project yet.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
