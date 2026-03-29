"use client";
import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { AlertTriangle, HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();
  const handleRetry = () => {
    startTransition(() => {
      reset();
      router.refresh();
    });
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden">
      <Empty className="space-y-10">
        <EmptyHeader>
          <EmptyTitle className="mask-b-from-20% mask-b-to-100% font-extrabold text-5xl">
            Oops! <AlertTriangle className="inline-block text-destructive" size={40} />
          </EmptyTitle>
          <EmptyDescription className="text-nowrap font-semibold text-foreground/80 mask-b-from-30% mask-b-to-100% text-2xl">
            {error.message}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={handleRetry} className="w-3/4 mx-auto" variant="default">
            Retry
          </Button>
          <Button onClick={() => router.push("/")} className="w-3/4 mx-auto" variant="outline">
            <HomeIcon data-icon="inline-start" />
            Go Home
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
