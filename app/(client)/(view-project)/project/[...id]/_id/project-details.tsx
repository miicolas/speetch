import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectDetailsProps } from "@/lib/types/project-view-types";

export function ProjectDetails({ project, paymentStatusInfo }: ProjectDetailsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Project details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total amount:</span>
          <span className="font-semibold">{project.amount} €</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment status:</span>
          <Badge
            variant={
              paymentStatusInfo.variant as
                | "default"
                | "destructive"
                | "outline"
                | "secondary"
            }
          >
            {paymentStatusInfo.label}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Creation date:</span>
          <span>
            {project.createdAt
              ? new Date(project.createdAt).toLocaleDateString("fr-FR")
              : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Reference:</span>
          <span className="font-mono text-sm">
            {project.id.substring(0, 8)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
} 