import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sparkles, Target, Zap, TrendingUp } from "lucide-react";

export default async function HomePage() {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  // If authenticated, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Otherwise, show landing page
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">X Growth</h1>
          <Button asChild variant="ghost" size="sm">
            <Link href="/api/auth/login">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI-Powered X Growth Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Grow Your X Account
            <br />
            <span className="text-primary">On Autopilot</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automate engagement, generate viral hooks, and grow your audience while you focus on creating great content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="/api/auth/login">
                Get Started Free
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-lg">
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Grow</h2>
          <p className="text-muted-foreground text-lg">Powerful features to accelerate your X growth</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Auto Engagement</h3>
              <p className="text-muted-foreground">
                Automatically engage with your target audience using AI-generated replies that sound natural and authentic.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Daily Hooks</h3>
              <p className="text-muted-foreground">
                Get AI-generated viral hooks delivered every morning at 8 AM IST. Never run out of content ideas.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart Targeting</h3>
              <p className="text-muted-foreground">
                Engage with 70+ curated accounts in your niche. Target indie hackers, SaaS founders, and tech influencers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Early Boost</h3>
              <p className="text-muted-foreground">
                Get Telegram notifications when you post. Boost engagement in the critical first 5 minutes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">AI Persona</h3>
              <p className="text-muted-foreground">
                Replies match your voice and style. The AI learns from your content to maintain authenticity.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Review & Approve</h3>
              <p className="text-muted-foreground">
                Full control over what gets posted. Review and approve all AI-generated content before it goes live.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8 p-12 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Grow Your Audience?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join indie hackers and creators who are growing their X presence on autopilot.
          </p>
          <Button asChild size="lg" className="h-12 px-8 text-lg">
            <Link href="/api/auth/login">
              Start Growing Today
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 X Growth. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
