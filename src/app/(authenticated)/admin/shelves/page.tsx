"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STORES, SHELVES } from "@/lib/mock-data";
import { Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function ShelvesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [storeFilter, setStoreFilter] = useState("ALL");

    const filteredShelves = SHELVES.filter(shelf => {
        const matchesSearch = shelf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shelf.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || shelf.status === statusFilter;
        const matchesStore = storeFilter === "ALL" || shelf.storeId === storeFilter;

        return matchesSearch && matchesStatus && matchesStore;
    });

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Shelf Management</h2>
                <Button>Add New Shelf</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Shelves</CardTitle>
                    <CardDescription>Manage and monitor shelved inventory across all locations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search shelves..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4" />
                                    <SelectValue placeholder="Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Statuses</SelectItem>
                                <SelectItem value="STOCKED">Stocked</SelectItem>
                                <SelectItem value="LOW">Low Stock</SelectItem>
                                <SelectItem value="EMPTY">Empty</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={storeFilter} onValueChange={setStoreFilter}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filter by Store" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Stores</SelectItem>
                                {STORES.map(store => (
                                    <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Store</TableHead>
                                    <TableHead>Shelf Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Aisle</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredShelves.map((shelf) => (
                                    <TableRow key={shelf.id}>
                                        <TableCell className="font-medium">
                                            {STORES.find(s => s.id === shelf.storeId)?.name}
                                        </TableCell>
                                        <TableCell>{shelf.name}</TableCell>
                                        <TableCell>{shelf.category}</TableCell>
                                        <TableCell>{shelf.aisle}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                shelf.status === 'EMPTY' ? 'destructive' :
                                                    shelf.status === 'LOW' ? 'secondary' :
                                                        'outline'
                                            } className={shelf.status === 'STOCKED' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : ''}>
                                                {shelf.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(shelf.lastUpdate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Details</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete Shelf</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredShelves.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No shelves found matching your criteria.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
