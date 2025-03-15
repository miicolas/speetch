import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectFAQ() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Frequently asked questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">
            How can I follow the progress of my project?
          </h3>
          <p className="text-sm text-muted-foreground">
            This page automatically updates to reflect the latest changes.
            Check it regularly to follow the progress of your project.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">
            How can I contact my project manager?
          </h3>
          <p className="text-sm text-muted-foreground">
            You can contact your project manager by email or phone using the
            contact information provided in the Contact section.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">How can I make a payment?</h3>
          <p className="text-sm text-muted-foreground">
            If a payment is pending, you will find a "Make payment" button in
            the payments section. Click on this button to proceed with the
            online payment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 