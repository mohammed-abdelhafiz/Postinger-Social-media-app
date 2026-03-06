import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form/ResetPasswordForm";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md sm:max-w-lg p-0">
        <MagicCard className="py-6">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-center">
              Reset Password
            </CardTitle>
            <CardDescription className="text-sm text-center">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 pt-4 w-full">
              <Button type="submit" form="reset-password-form">
                Reset Password
              </Button>
              <p className="text-sm text-muted-foreground ml-0.5">
                Remember your password?
                <Link
                  href="/login"
                  className="ml-1 hover:underline text-foreground"
                >
                  Login
                </Link>
              </p>
            </div>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  );
}
