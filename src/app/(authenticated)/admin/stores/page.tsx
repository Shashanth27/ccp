"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STORES, SHELVES, USERS } from "@/lib/mock-data";
import { Building2, MapPin, Package, Users, MoreHorizontal, ArrowRight } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function StoresPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Store Management</h2>
                <Button>
                    <Building2 className="mr-2 h-4 w-4" />
                    Add New Store
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {STORES.map((store) => {
                    const storeShelves = SHELVES.filter((s) => s.storeId === store.id);
                    const storeStaff = USERS.filter((u) => u.storeId === store.id);
                    const activeAlertCount = storeShelves.filter(s => s.status !== 'STOCKED').length;

                    return (
                        <Card key={store.id} className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl">{store.name}</CardTitle>
                                    <CardDescription className="flex items-center">
                                        <MapPin className="mr-1 h-3 w-3" /> Store ID: {store.id}
                                    </CardDescription>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Edit Store Settings</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Deactivate Store</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-xs text-muted-foreground uppercase font-semibold">Health Score</span>
                                        <span className={`text-2xl font-bold ${store.healthScore > 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {store.healthScore}%
                                        </span>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-xs text-muted-foreground uppercase font-semibold">Active Issues</span>
                                        <span className="text-2xl font-bold">{activeAlertCount}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Package className="mr-2 h-4 w-4" />
                                        {store.totalShelves} Monitored Shelves
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Users className="mr-2 h-4 w-4" />
                                        {storeStaff.length} Staff Members
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 border-t bg-muted/20">
                                <Button variant="ghost" className="w-full justify-between group">
                                    Manage Shelves <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
