import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/20 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-md px-6">
                <div className="space-y-4">
                    <h1 className="bg-linear-gradient-to-r from-primary to-purple-400 bg-clip-text text-6xl font-bold text-transparent">
                        X Growth
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        The ultimate autopilot for your X account.
                        <br />
                        <span className="text-sm opacity-70">Grow 10x faster with AI & Automation.</span>
                    </p>
                </div>

                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl w-full space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Welcome Back</h3>
                        <p className="text-sm text-muted-foreground">Sign in to manage your growth.</p>
                    </div>

                    <Button asChild size="lg" className="w-full h-12 text-lg font-medium rounded-xl bg-white text-black hover:bg-white/90 transition-all hover:scale-[1.02]">
                        <Link href="/api/auth/login">
                            <Twitter className="mr-2 h-5 w-5 fill-current" />
                            Connect X Account
                        </Link>
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        By connecting, you agree to our Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
}
