import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-muted rounded-full">
                            <Wrench className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </div>
                    <CardTitle>Under Construction</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The <strong>{title}</strong> module is currently being built.</p>
                </CardContent>
            </Card>
        </div>
    );
}
