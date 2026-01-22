"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <Card className="w-full max-w-sm text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-red-100 rounded-full text-red-600">
                            <Lock className="h-8 w-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        You do not have permission to view this page. Please contact your administrator if you believe this is an error.
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button asChild>
                        <Link href="/login">Return to Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
