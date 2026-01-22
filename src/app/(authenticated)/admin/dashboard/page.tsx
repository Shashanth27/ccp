"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { USERS, STORES, SHELVES, ALERTS } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2, AlertTriangle, CheckCircle2, PackageX } from "lucide-react";

export default function AdminDashboard() {
    // Compute Stats
    const totalStores = STORES.length;
    const totalShelves = STORES.reduce((acc, s) => acc + s.totalShelves, 0);
    const activeAlerts = ALERTS.filter(a => a.status !== 'RESOLVED').length;
    const healthScore = Math.round(STORES.reduce((acc, s) => acc + s.healthScore, 0) / totalStores);

    const shelfStatusData = [
        { name: 'Stocked', value: SHELVES.filter(s => s.status === 'STOCKED').length, color: '#22c55e' },
        { name: 'Low', value: SHELVES.filter(s => s.status === 'LOW').length, color: '#eab308' },
        { name: 'Empty', value: SHELVES.filter(s => s.status === 'EMPTY').length, color: '#ef4444' },
    ];

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStores}</div>
                        <p className="text-xs text-muted-foreground">Across 2 regions</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Shelf Health</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{healthScore}%</div>
                        <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeAlerts}</div>
                        <p className="text-xs text-muted-foreground">+4 since last hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Empty Shelves</CardTitle>
                        <PackageX className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{shelfStatusData.find(d => d.name === 'Empty')?.value || 0}</div>
                        <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Shelf Availability Overview</CardTitle>
                        <CardDescription>Real-time composition of shelf statuses across all stores.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={shelfStatusData} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={60} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                                    <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={30}>
                                        {shelfStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>High Risk Shelves</CardTitle>
                        <CardDescription>Shelves frequently reporting empty status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Store</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Risk</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {SHELVES.filter(s => s.status === 'EMPTY' || s.status === 'LOW').slice(0, 5).map(shelf => (
                                    <TableRow key={shelf.id}>
                                        <TableCell className="font-medium">{STORES.find(st => st.id === shelf.storeId)?.name}</TableCell>
                                        <TableCell>{shelf.category}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={shelf.status === 'EMPTY' ? 'destructive' : 'secondary'}>High</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
