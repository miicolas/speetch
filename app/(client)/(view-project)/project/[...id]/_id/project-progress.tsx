import { Calendar } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProjectProgressProps } from "@/lib/types/project-view-types";

export function ProjectProgress({
    progressPercentage,
    statusInfo,
    formattedEndDate,
    timeDistance,
}: ProjectProgressProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">Project progress</CardTitle>
                <CardDescription>
                    Global project progress tracking
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between mb-1">
                        <span
                            className={`text-sm font-medium ${statusInfo.color}`}
                        >
                            {statusInfo.label}
                        </span>
                        <span className="text-sm font-medium">
                            {progressPercentage}%
                        </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                        <Calendar className="h-4 w-4" />
                        <span>
                            Expected delivery date: {formattedEndDate} (
                            {timeDistance})
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
