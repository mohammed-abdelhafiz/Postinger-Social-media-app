import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { AlertTriangle } from "lucide-react";

export const ProfileCardError = ({ refetch }: { refetch: () => void }) => {
  return (
    <Card className="md:w-5/12 w-full p-0 h-64! flex items-center justify-center">
      <CardContent className="space-y-4 pb-4 flex flex-col items-center justify-center">
        <AlertTriangle className="text-red-500" />
        <p className="text-lg font-bold">Oops! Something went wrong</p>
        <p className="text-muted-foreground text-sm">
          We couldn&apos;t load the profile data. Please try again later.
        </p>
        <Button className="w-full" onClick={refetch}>
          Try again
        </Button>
      </CardContent>
    </Card>
  );
};
