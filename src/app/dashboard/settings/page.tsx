import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="your@email.com" disabled className="bg-white/5 border-white/10" />
                        <p className="text-sm text-muted-foreground">Managed by X (Twitter) Login</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Daily Digest</Label>
                            <p className="text-sm text-muted-foreground">Receive a daily summary of your growth</p>
                        </div>
                        <Button variant="outline" disabled>Coming Soon</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
