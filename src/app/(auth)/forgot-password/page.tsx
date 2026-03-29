import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { MagicCard } from "@/shared/components/ui/magic-card";

import { RequestResetPasswordForm } from "@/features/auth/components/forgot-password-form/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
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
            <RequestResetPasswordForm />
          </CardContent>
          <CardFooter className="pt-4 bg-transparent border-t-0">
            <p className="text-sm text-muted-foreground ml-0.5">
              Remember your password?
              <Link
                href="/login"
                className="ml-1 hover:underline text-foreground"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  );
}
