import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { MagicCard } from "@/shared/components/ui/magic-card";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md sm:max-w-lg p-0">
        <MagicCard className="py-6">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-center">
              Create New Password
            </CardTitle>
            <CardDescription className="text-sm text-center">
              Choose a strong new password to secure your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm />
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
}
