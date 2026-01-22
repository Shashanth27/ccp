"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";

export default function ReportsPage() {
    const reports = [
        { id: 1, title: 'Weekly Shelf Health Summary', date: 'Oct 23, 2024', type: 'PDF', size: '1.2 MB' },
        { id: 2, title: 'Store Activity Log', date: 'Oct 22, 2024', type: 'CSV', size: '540 KB' },
        { id: 3, title: 'Alert Resolution Efficiency', date: 'Oct 20, 2024', type: 'PDF', size: '2.4 MB' },
        { id: 4, title: 'Monthly Inventory Audit', date: 'Oct 01, 2024', type: 'XLSX', size: '4.1 MB' },
    ];

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Reports & Exports</h2>
                <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Select Date Range
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                    <Card key={report.id}>
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-base">{report.title}</CardTitle>
                                    <CardDescription>{report.date}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted p-2 rounded w-fit">
                                <span className="font-semibold px-1.5 py-0.5 bg-background rounded border">{report.type}</span>
                                <span>{report.size}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button className="w-full" variant="secondary">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
