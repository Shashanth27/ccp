export type Role = 'ADMIN' | 'MANAGER' | 'STAFF';

export interface User {
    id: string;
    username: string;
    role: Role;
    storeId?: string; // Admin has access to all, others bound to one
    avatar?: string;
    name: string;
}

export type ShelfStatus = 'STOCKED' | 'LOW' | 'EMPTY';

export interface Shelf {
    id: string;
    storeId: string;
    name: string;
    category: string;
    aisle: string;
    status: ShelfStatus;
    lastUpdate: string;
    imageUrl?: string;
    confidence?: number;
}

export type AlertStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';

export interface Alert {
    id: string;
    shelfId: string;
    storeId: string;
    type: 'EMPTY_SHELF' | 'LOW_STOCK';
    status: AlertStatus;
    assignedTo?: string; // User ID
    createdAt: string;
    resolvedAt?: string;
    imageEvidence?: string;
    description: string;
}

export interface Store {
    id: string;
    name: string;
    totalShelves: number;
    healthScore: number;
}
