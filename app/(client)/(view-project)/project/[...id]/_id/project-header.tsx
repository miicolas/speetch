import { Badge } from "@/components/ui/badge";
import { ProjectHeaderProps } from "@/lib/types/project-view-types";

export function ProjectHeader({ project, statusInfo }: ProjectHeaderProps) {
  const StatusIcon = statusInfo.icon;
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground">{project.description}</p>
      </div>
      <div>
        <Badge
          variant={statusInfo.variant as "default" | "destructive" | "outline" | "secondary"}
          className="px-3 py-1 text-sm flex items-center gap-1"
        >
          <StatusIcon className="h-3.5 w-3.5" />
          <span>{statusInfo.label}</span>
        </Badge>
      </div>
    </div>
  );
} 