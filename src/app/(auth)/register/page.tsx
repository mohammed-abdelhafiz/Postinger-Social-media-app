import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";

import { RegisterForm } from "@/features/auth/components/register-form/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md sm:max-w-lg p-0">
        <MagicCard className="py-6">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-center">
              Register Now
            </CardTitle>
            <CardDescription className="text-sm text-center">
              Create your postinger account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="pt-4 bg-transparent border-t-0">
            <p className="text-sm text-muted-foreground ml-0.5">
              Already have an account?
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
