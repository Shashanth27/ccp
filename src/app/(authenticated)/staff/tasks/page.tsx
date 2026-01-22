"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { ALERTS, SHELVES, STORES } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Package, CheckCircle2 } from "lucide-react";
import Link from 'next/link';

export default function StaffTasks() {
    const { user } = useAuth();

    // Filter alerts assigned to this staff or unassigned in their store (if that's the rule)
    // Requirement: "List of assigned alerts"
    // Let's show alerts for their store that are PENDING (unassigned) or assigned to them.
    const myStoreId = user?.storeId;
    const myTasks = ALERTS.filter(a =>
        a.storeId === myStoreId &&
        a.status !== 'RESOLVED' &&
        (!a.assignedTo || a.assignedTo === user?.id)
    );

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">My Tasks</h2>
                <Badge variant="outline">{myTasks.length} Pending</Badge>
            </div>

            <div className="grid gap-4">
                {myTasks.map(task => {
                    const shelf = SHELVES.find(s => s.id === task.shelfId);
                    const store = STORES.find(s => s.id === task.storeId);
                    const isUrgent = task.type === 'EMPTY_SHELF';

                    return (
                        <Card key={task.id} className={`border-l-4 ${isUrgent ? 'border-l-red-500' : 'border-l-yellow-500'}`}>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant={isUrgent ? "destructive" : "default"} className="uppercase text-[10px]">
                                                {task.type.replace('_', ' ')}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {new Date(task.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold">{shelf?.name}</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <MapPin className="mr-1 h-4 w-4" />
                                                Aisle {shelf?.aisle}
                                            </div>
                                            <div className="flex items-center">
                                                <Package className="mr-1 h-4 w-4" />
                                                {shelf?.category}
                                            </div>
                                        </div>
                                        <p className="text-sm pt-2">{task.description}</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Button asChild>
                                            <Link href={`/staff/alerts/${task.id}`}>
                                                View Details & Resolve
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
                {myTasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-muted/50">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-xl font-medium">All Caught Up!</h3>
                        <p className="text-muted-foreground">No pending alerts for your store.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
