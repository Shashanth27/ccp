"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SHELVES, ALERTS } from "@/lib/mock-data";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

export default function AnalyticsPage() {
    // Mock Trend Data
    const trendData = [
        { time: '08:00', stocked: 85, empty: 5 },
        { time: '10:00', stocked: 80, empty: 8 },
        { time: '12:00', stocked: 75, empty: 12 },
        { time: '14:00', stocked: 72, empty: 15 },
        { time: '16:00', stocked: 78, empty: 10 },
        { time: '18:00', stocked: 82, empty: 6 },
        { time: '20:00', stocked: 88, empty: 2 },
    ];

    const alertTypeData = [
        { name: 'Empty Shelf', value: ALERTS.filter(a => a.type === 'EMPTY_SHELF').length },
        { name: 'Low Stock', value: ALERTS.filter(a => a.type === 'LOW_STOCK').length },
    ];

    const COLORS = ['#ef4444', '#eab308'];

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h2 className="text-2xl font-bold tracking-tight">Analytics & Trends</h2>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Intraday Stock Levels</CardTitle>
                        <CardDescription>Stocked % vs Empty % throughout the day.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Legend />
                                    <Line type="monotone" dataKey="stocked" stroke="#22c55e" strokeWidth={2} name="Stocked %" />
                                    <Line type="monotone" dataKey="empty" stroke="#ef4444" strokeWidth={2} name="Empty %" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Alert Distribution</CardTitle>
                        <CardDescription>Breakdown of alert types generated this week.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={alertTypeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {alertTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Resolution Efficiency</CardTitle>
                    <CardDescription>Average time taken to resolve high-priority alerts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
                            <p className="text-3xl font-bold">12m</p>
                            <span className="text-xs text-green-600">↓ 2m from last week</span>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Alerts Resolved Today</p>
                            <p className="text-3xl font-bold">18</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Unresolved &gt; 2h</p>
                            <p className="text-3xl font-bold text-red-500">2</p>
                            <p className="text-xs text-muted-foreground">Requires Manager Review</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
