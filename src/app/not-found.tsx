import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-6rem)] w-full items-center justify-center overflow-hidden">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
            <Image
              src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-1.png"
              alt="404 illustration"
              width={406}
              height={406}
            />
          </EmptyTitle>
          <EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
            The page you&apos;re looking for might have been <br />
            moved or doesn&apos;t exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            render={
              <Link href="/">
                <HomeIcon data-icon="inline-start" />
                Go Home
              </Link>
            }
            nativeButton={false}
            className="w-1/2 mx-auto"
          />
        </EmptyContent>
      </Empty>
    </div>
  );
}
