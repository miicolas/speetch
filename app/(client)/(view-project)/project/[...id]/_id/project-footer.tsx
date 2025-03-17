import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ProjectFooter() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-t pt-8 mt-8">
      <p className="text-sm text-muted-foreground">
        Questions ? Contact us at{" "}
        <a
          href="mailto:contact@speetly.com"
          className="text-primary hover:underline"
        >
          nicolas@speetly.com
        </a>
      </p>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="mt-4 md:mt-0">
              <FileText className="h-4 w-4 mr-2" />
              Download the summary
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Feature coming soon</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
} 