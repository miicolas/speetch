"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BigCalendar } from "@/components/ui/big-calendar";
import { Project } from "@/lib/types/project-type";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
interface ProjectCalendarProps {
    projects: Project[];
}

export function ProjectCalendar({ projects }: ProjectCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const projectEndDates = projects.reduce((acc, project) => {
        const endDate = new Date(project.endDate);
        const dateKey = endDate.toISOString().split("T")[0];

        if (!acc.has(dateKey)) {
            acc.set(dateKey, []);
        }
        acc.get(dateKey)?.push(project);
        return acc;
    }, new Map<string, Project[]>());

    const getProjectsForDate = (date: Date) => {
        const dateKey = date.toISOString().split("T")[0];
        return projectEndDates.get(dateKey) || [];
    };

    const getProjectStatusColor = (status: string) => {
        switch (status) {
            case "done":
                return "bg-green-500";
            case "pending":
                return "bg-indigo-500";
            case "not_started":
                return "bg-amber-500";
            default:
                return "bg-gray-400";
        }
    };

    const getProjectStatusLabel = (status: string) => {
        switch (status) {
            case "done":
                return "Terminé";
            case "pending":
                return "En cours";
            case "not_started":
                return "Non démarré";
            default:
                return "Indéfini";
        }
    };

    return (
        <Card className="col-span-4 bg-white rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <div>
                    <CardTitle className="text-xl font-semibold">
                        Calendar of projects
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                        {date
                            ? format(date, "MMMM yyyy", { locale: enUS })
                            : ""}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                        <span className="text-gray-600">In progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="text-gray-600">Not started</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-gray-600">Done</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <TooltipProvider>
                    <BigCalendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={fr}
                        className="border-none"
                        components={{
                            DayContent: (props) => {
                                const projects = getProjectsForDate(props.date);
                                const isToday =
                                    props.date.toDateString() ===
                                    new Date().toDateString();

                                return (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div
                                                className={cn(
                                                    "w-full h-full flex flex-col items-center justify-center rounded-lg transition-all",
                                                    isToday &&
                                                        "font-medium text-indigo-600 bg-gray-50 border border-gray-100",
                                                    projects.length > 0 &&
                                                        "bg-gray-50 hover:bg-gray-100"
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        "text-base",
                                                        projects.length > 0 &&
                                                            "font-medium"
                                                    )}
                                                >
                                                    {props.date.getDate()}
                                                </span>
                                                {projects.length > 0 && (
                                                    <div className="flex">
                                                        {projects
                                                            .slice(0, 3)
                                                            .map((project) => (
                                                                <div
                                                                    key={
                                                                        project.id
                                                                    }
                                                                    className={cn(
                                                                        "w-2 h-2 rounded-full",
                                                                        getProjectStatusColor(
                                                                            project.status
                                                                        )
                                                                    )}
                                                                />
                                                            ))}
                                                        {projects.length >
                                                            3 && (
                                                            <span className="text-xs text-gray-500 ml-1">
                                                                +
                                                                {projects.length -
                                                                    3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </TooltipTrigger>
                                        {projects.length > 0 && (
                                            <TooltipContent className="w-72 p-3 bg-white shadow-lg rounded-lg border-none">
                                                <div className="space-y-3">
                                                    <p className="font-medium border-b border-gray-100 pb-2 text-gray-800">
                                                        {format(
                                                            props.date,
                                                            "dd MMMM yyyy",
                                                            { locale: fr }
                                                        )}
                                                    </p>
                                                    <div className="space-y-2">
                                                        {projects.map(
                                                            (project) => (
                                                                <div
                                                                    key={
                                                                        project.id
                                                                    }
                                                                    className="flex items-center justify-between gap-2 p-1.5 rounded-md hover:bg-gray-50"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className={cn(
                                                                                "w-3 h-3 rounded-full",
                                                                                getProjectStatusColor(
                                                                                    project.status
                                                                                )
                                                                            )}
                                                                        />
                                                                        <span className="text-sm font-medium text-gray-700">
                                                                            {
                                                                                project.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Badge
                                                                            variant="outline"
                                                                            className="text-xs bg-white"
                                                                        >
                                                                            {getProjectStatusLabel(
                                                                                project.status
                                                                            )}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                );
                            },
                        }}
                    />
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}
