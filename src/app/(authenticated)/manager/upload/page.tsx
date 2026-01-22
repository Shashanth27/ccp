"use client";

import { Suspense, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/auth-context";
import { SHELVES } from "@/lib/mock-data";
import { Camera, Upload as UploadIcon, Loader2, Check, AlertTriangle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UploadContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [selectedShelf, setSelectedShelf] = useState(searchParams.get('shelf') || '');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<{ status: string, confidence: number } | null>(null);

    const myShelves = SHELVES.filter(s => s.storeId === user?.storeId);

    const handleCapture = async () => {
        setStep(2);
        setAnalyzing(true);

        // Simulate Analysis
        setTimeout(() => {
            const shelf = myShelves.find(s => s.id === selectedShelf);
            const statuses = ['STOCKED', 'LOW', 'EMPTY'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

            setResult({
                status: randomStatus,
                confidence: 0.85 + Math.random() * 0.14
            });
            setAnalyzing(false);
            setStep(3);
        }, 2500);
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 max-w-3xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">New Shelf Scan</h1>
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
                    <span className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                    <span className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Select Target Shelf</CardTitle>
                                <CardDescription>Choose the shelf you are currently monitoring.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Shelf</label>
                                    <Select value={selectedShelf} onValueChange={setSelectedShelf}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a shelf..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {myShelves.map(s => (
                                                <SelectItem key={s.id} value={s.id}>{s.name} (Aisle {s.aisle})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30">
                                    <div className="text-center text-muted-foreground">
                                        <Camera className="mx-auto h-8 w-8 mb-2 opacity-50" />
                                        <p>Camera Preview</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg" disabled={!selectedShelf} onClick={handleCapture}>
                                    <Camera className="mr-2 h-4 w-4" /> Capture & Analyze
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex flex-col items-center justify-center py-12 space-y-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                            <div className="relative bg-background p-4 rounded-full border shadow-lg">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold">Analyzing Shelf Composition...</h2>
                            <p className="text-muted-foreground">Running computer vision models to detect stock levels.</p>
                        </div>
                    </motion.div>
                )}

                {step === 3 && result && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="border-2 border-primary/10">
                            <CardHeader className="text-center pb-2">
                                <CardTitle>Analysis Complete</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center text-center space-y-6 pt-6">
                                <div className={`p-4 rounded-full ${result.status === 'STOCKED' ? 'bg-green-100 text-green-600' :
                                        result.status === 'EMPTY' ? 'bg-red-100 text-red-600' :
                                            'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {result.status === 'STOCKED' ? <Check className="h-12 w-12" /> : <AlertTriangle className="h-12 w-12" />}
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-4xl font-bold">{result.status}</h3>
                                    <p className="text-muted-foreground font-mono">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                                </div>

                                {result.status !== 'STOCKED' && (
                                    <div className="bg-muted p-4 rounded-lg w-full text-left flex gap-3">
                                        <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
                                        <div className="text-sm">
                                            <p className="font-semibold">Alert Triggered</p>
                                            <p className="text-muted-foreground">An alert has been dispatched to available staff for Aisle {myShelves.find(s => s.id === selectedShelf)?.aisle}.</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex gap-4">
                                <Button variant="outline" className="flex-1" onClick={() => { setStep(1); setResult(null); }}>
                                    Scan Another
                                </Button>
                                <Button className="flex-1" asChild>
                                    <Link href="/manager/dashboard">
                                        Done <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function UploadPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UploadContent />
        </Suspense>
    );
}
