import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-2xl shadow-soft">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email to reset your password</p>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <Button className="w-full" size="lg">Send Reset Link</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" passHref>
            <span className="text-primary hover:underline">Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
