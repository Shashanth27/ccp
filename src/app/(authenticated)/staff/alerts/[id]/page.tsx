"use client";

import { useParams, useRouter } from "next/navigation";
import { ALERTS, SHELVES } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Camera, Loader2 } from "lucide-react";

export default function AlertDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // Find data
    const alert = ALERTS.find(a => a.id === id);
    const shelf = SHELVES.find(s => s.id === alert?.shelfId);

    const [status, setStatus] = useState(alert?.status || 'PENDING');
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");

    if (!alert || !shelf) {
        return <div className="p-8">Alert not found</div>;
    }

    const handleStatusChange = async (newStatus: 'IN_PROGRESS' | 'RESOLVED') => {
        setLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus(newStatus);
        setLoading(false);

        if (newStatus === 'RESOLVED') {
            router.push('/staff/tasks');
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 max-w-5xl mx-auto w-full">
            <Button variant="ghost" className="w-fit pl-0" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tasks
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Details Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alert Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden group">
                                {/* Mock Image Placeholder */}
                                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-muted-foreground">
                                    No Image Available (Mock)
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b pb-4">
                                <span className="text-muted-foreground">Shelf</span>
                                <span className="font-medium">{shelf.name}</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4">
                                <span className="text-muted-foreground">Type</span>
                                <Badge variant="destructive">{alert.type.replace('_', ' ')}</Badge>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4">
                                <span className="text-muted-foreground">Current Status</span>
                                <Badge variant={status === 'RESOLVED' ? 'default' : status === 'IN_PROGRESS' ? 'secondary' : 'outline'}>
                                    {status}
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                <span className="text-muted-foreground text-sm">Description</span>
                                <p className="text-sm">{alert.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resolution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {status === 'PENDING' && (
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">Acknowledge this task to let others know you are working on it.</p>
                                    <Button className="w-full" onClick={() => handleStatusChange('IN_PROGRESS')} disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Start Restocking
                                    </Button>
                                </div>
                            )}

                            {status === 'IN_PROGRESS' && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
                                        <p className="font-semibold mb-1">Instruction:</p>
                                        Restock {shelf.category} items on Aisle {shelf.aisle}. Ensure valid expiration dates.
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Proof of Restock (Optional)</Label>
                                        <Button variant="outline" className="w-full h-24 border-dashed">
                                            <Camera className="mr-2 h-4 w-4" />
                                            Capture After Image
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Comments</Label>
                                        <Textarea
                                            placeholder="Any issues encountered?"
                                            value={comment}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                                        />
                                    </div>

                                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange('RESOLVED')} disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Mark as Resolved
                                    </Button>
                                </div>
                            )}

                            {status === 'RESOLVED' && (
                                <div className="flex flex-col items-center justify-center py-8 text-green-600">
                                    <CheckCircle2 className="h-16 w-16 mb-4" />
                                    <h3 className="text-xl font-bold">Resovled</h3>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
