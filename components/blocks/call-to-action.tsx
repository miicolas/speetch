import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col gap-4 py-12 border border-neutral-200 my-12 bg-neutral-50 relative">
      <Plus
        strokeWidth={1}
        className="text-ali absolute -left-5 -top-5 h-10 w-10 z-10 text-indigo-500 animate-pulse"
      />
      <Plus
        strokeWidth={1}
        className="text-ali absolute -bottom-5 -left-5 h-10 w-10 z-10 text-indigo-500 animate-pulse"
      />
      <Plus
        strokeWidth={1}
        className="text-ali absolute -right-5 -top-5 h-10 w-10 z-10 text-indigo-500 animate-pulse"
      />
      <Plus
        strokeWidth={1}
        className="text-ali absolute -bottom-5 -right-5 h-10 w-10 z-10 text-indigo-500 animate-pulse"
      />
      <h2 className="text-4xl font-bold text-center">Ready to get started?</h2>
      <p className="text-center text-neutral-500">
        Start using our platform today and see the difference.
      </p>
      <div className="flex flex-row gap-4 justify-center items-center">
        <Button className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-400"  >Get Started</Button>
        <Button variant="outline">Not Convinced?</Button>
      </div>
    </div>
  );
}
