"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SHELVES } from "@/lib/mock-data";
import { useAuth } from "@/context/auth-context";
import { Package, MapPin, AlertCircle } from "lucide-react";

export default function MyShelvesPage() {
    const { user } = useAuth();

    // Filter shelves for this manager's store
    const myShelves = SHELVES.filter(s => s.storeId === user?.storeId);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">My Shelves</h2>
                <Badge variant="outline" className="text-base px-3 py-1">
                    {myShelves.length} Total
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myShelves.map((shelf) => (
                    <Card key={shelf.id} className="overflow-hidden">
                        <div className={`h-2 w-full ${shelf.status === 'STOCKED' ? 'bg-green-500' :
                                shelf.status === 'EMPTY' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{shelf.name}</CardTitle>
                                <Badge variant={shelf.status === 'EMPTY' ? 'destructive' : 'secondary'}>
                                    {shelf.status}
                                </Badge>
                            </div>
                            <CardDescription>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="h-3 w-3" /> Aisle {shelf.aisle}
                                    <span className="text-slate-300">|</span>
                                    <Package className="h-3 w-3" /> {shelf.category}
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm pt-2 border-t">
                                <span className="text-muted-foreground">Last Scan</span>
                                <span>{new Date(shelf.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            {shelf.confidence && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                                    <AlertCircle className="h-3 w-3" />
                                    AI Confidence: {(shelf.confidence * 100).toFixed(0)}%
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
                {myShelves.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No shelves assigned to your store yet.
                    </div>
                )}
            </div>
        </div>
    );
}
