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
import { LoginForm } from "@/features/auth/components/login-form/LoginForm";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md sm:max-w-lg p-0">
        <MagicCard className="py-6">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-sm text-center">
              Login to your postinger account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 pt-4 w-full">
              <Button type="submit" form="login-form">
                Login
              </Button>
              <p className="text-sm text-muted-foreground ml-0.5">
                Don&apos;t have an account?
                <Link
                  href="/register"
                  className="ml-1 hover:underline text-foreground"
                >
                  Register
                </Link>
              </p>
            </div>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  );
}
