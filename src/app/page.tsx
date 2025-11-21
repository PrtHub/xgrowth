import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <h1 className="bg-linear-gradient-to-r from-primary to-purple-400 bg-clip-text text-6xl font-bold text-transparent">
            X Growth
          </h1>
          <p className="text-xl text-muted-foreground">
            Autopilot growth for your X account.
          </p>
        </div>
        <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full bg-white text-black hover:bg-white/90">
          <Link href="/api/auth/login">
            Sign in with X
          </Link>
        </Button>
      </div>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/20 blur-[120px]" />
      </div>
    </div>
  );
}
