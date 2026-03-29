import { Button } from "@/shared/components/ui/button";
import { AlertCircle } from "lucide-react";

interface SuggestionsCardErrorProps {
  refetch: () => void;
}

export function SuggestionsCardError({ refetch }: SuggestionsCardErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <AlertCircle className="h-8 w-8 text-destructive mb-2" />
      <p className="text-sm text-muted-foreground mb-4">
        Failed to load suggestions
      </p>
      <Button variant="outline" size="sm" onClick={() => refetch()}>
        Try again
      </Button>
    </div>
  );
}
