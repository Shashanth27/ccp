"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ALERTS, SHELVES, USERS } from "@/lib/mock-data";
import { useAuth } from "@/context/auth-context";
import { AlertTriangle, Clock, CheckCircle2, User } from "lucide-react";

export default function StoreAlertsPage() {
    const { user } = useAuth();

    const storeAlerts = ALERTS.filter(a => a.storeId === user?.storeId);
    const activeAlerts = storeAlerts.filter(a => a.status !== 'RESOLVED');
    const resolvedAlerts = storeAlerts.filter(a => a.status === 'RESOLVED');

    const AlertCard = ({ alert }: { alert: typeof ALERTS[0] }) => {
        const shelf = SHELVES.find(s => s.id === alert.shelfId);
        const assignee = USERS.find(u => u.id === alert.assignedTo);

        return (
            <Card className="mb-4">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <CardTitle className="text-base flex items-center gap-2">
                                {alert.type === 'EMPTY_SHELF' ? (
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                ) : (
                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                )}
                                {alert.type.replace('_', ' ')}
                            </CardTitle>
                            <CardDescription>
                                Shelf: <span className="font-medium text-foreground">{shelf?.name}</span> (Aisle {shelf?.aisle})
                            </CardDescription>
                        </div>
                        <Badge variant={alert.status === 'RESOLVED' ? 'default' : 'outline'}>
                            {alert.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                        {alert.description}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(alert.createdAt).toLocaleString()}
                        </div>
                        {assignee && (
                            <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Assigned to: {assignee.name}
                            </div>
                        )}
                        {!assignee && alert.status !== 'RESOLVED' && (
                            <span className="text-orange-500 font-medium">Unassigned</span>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h2 className="text-2xl font-bold tracking-tight">Store Alerts</h2>
            <Tabs defaultValue="active" className="w-full">
                <TabsList>
                    <TabsTrigger value="active">Active ({activeAlerts.length})</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-4">
                    {activeAlerts.length > 0 ? (
                        activeAlerts.map(alert => <AlertCard key={alert.id} alert={alert} />)
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                            <CheckCircle2 className="h-12 w-12 mb-2 text-green-500" />
                            <p>No active alerts. All good!</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                    {resolvedAlerts.length > 0 ? (
                        resolvedAlerts.map(alert => <AlertCard key={alert.id} alert={alert} />)
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">No historical data yet.</div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
