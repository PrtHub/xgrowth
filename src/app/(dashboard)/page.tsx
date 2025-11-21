"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Eye, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function DashboardPage() {
    const user = useQuery(api.users.getUser, { twitterId: "demo" });
    const stats = useQuery(api.users.getStats, user?._id ? { userId: user._id } : "skip");

    // Mock data if no stats yet
    const data = stats?.map((s: any) => ({
        name: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        followers: s.followers,
        impressions: s.impressions
    })).reverse() || [
            { name: 'Nov 1', followers: 1200, impressions: 4000 },
            { name: 'Nov 5', followers: 1250, impressions: 3000 },
            { name: 'Nov 10', followers: 1300, impressions: 5000 },
            { name: 'Nov 15', followers: 1400, impressions: 8000 },
            { name: 'Nov 20', followers: 1450, impressions: 6000 },
        ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <Button className="gap-2 bg-white/10 hover:bg-white/20 text-white border-0">
                    <RefreshCw className="h-4 w-4" />
                    Sync Latest Data
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Followers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{(user as any)?.followers || "1,450"}</div>
                        <p className="text-xs text-emerald-500 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg. Impressions
                        </CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">5,231</div>
                        <p className="text-xs text-emerald-500 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Growth Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f1f1f', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="followers"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#colorFollowers)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
