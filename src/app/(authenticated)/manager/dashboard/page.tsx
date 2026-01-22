"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { AlertTriangle, Camera, Upload, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SHELVES, ALERTS, STORES } from "@/lib/mock-data";

export default function ManagerDashboard() {
    const { user } = useAuth();

    // Filter data for this manager's store
    // If user is Admin but viewing this page (conceptually), show all or a specific one. 
    // But RBAC blocks admin from here in my auth-context logic? 
    // Wait, I said: "if (pathname.startsWith('/manager') && user.role !== 'MANAGER' && user.role !== 'ADMIN')"
    // So Admin CAN view. If Admin, show Store 1 by default or Aggregate.
    // Let's assume Manager view is Store-specific.

    const targetStoreId = user?.storeId || 's1';
    const storeShelves = SHELVES.filter(s => s.storeId === targetStoreId);
    const storeAlerts = ALERTS.filter(a => a.storeId === targetStoreId && a.status !== 'RESOLVED');

    const emptyShelves = storeShelves.filter(s => s.status === 'EMPTY').length;
    const lowShelves = storeShelves.filter(s => s.status === 'LOW').length;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Store Operations</h2>
                    <p className="text-muted-foreground">Overview for {STORES.find(s => s.id === targetStoreId)?.name || 'Store'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button asChild>
                        <Link href="/manager/upload">
                            <Camera className="mr-2 h-4 w-4" />
                            Capture Shelf
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">Critical Attention</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-700 dark:text-red-300">{emptyShelves}</div>
                        <p className="text-xs text-red-600/80">Empty Shelves Detected</p>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Low Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{lowShelves}</div>
                        <p className="text-xs text-yellow-600/80">Restock recommended</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{storeAlerts.length}</div>
                        <p className="text-xs text-muted-foreground">Pending staff action</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Daily Uploads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Last upload: 10 mins ago</p>
                    </CardContent>
                </Card>
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Shelves Requiring Action</CardTitle>
                        <CardDescription>Shelves identified as Empty or Low Stock.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {storeShelves.filter(s => s.status !== 'STOCKED').map(shelf => (
                                <div key={shelf.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{shelf.name}</p>
                                        <p className="text-sm text-muted-foreground">Aisle {shelf.aisle} • {shelf.category}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${shelf.status === 'EMPTY' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {shelf.status}
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/manager/upload?shelf=${shelf.id}`}>
                                                Verify
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {storeShelves.filter(s => s.status !== 'STOCKED').length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    All shelves are stocked! Good job.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {storeAlerts.slice(0, 5).map(alert => (
                                <div key={alert.id} className="flex flex-col gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium uppercase text-muted-foreground">{alert.type.replace('_', ' ')}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium">shelf: {storeShelves.find(s => s.id === alert.shelfId)?.name}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                            {alert.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {storeAlerts.length === 0 && (
                                <p className="text-sm text-muted-foreground">No active alerts.</p>
                            )}
                            <Button variant="ghost" className="w-full text-xs" asChild>
                                <Link href="/manager/alerts">View All Alerts <ArrowRight className="ml-1 h-3 w-3" /></Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
