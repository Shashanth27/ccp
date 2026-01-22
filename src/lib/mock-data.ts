import { User, Store, Shelf, Alert } from './types';

export const USERS: User[] = [
    { id: 'u1', username: 'admin', role: 'ADMIN', name: 'Alice Admin', avatar: '/avatars/01.png' },
    { id: 'u2', username: 'manager1', role: 'MANAGER', storeId: 's1', name: 'Bob Manager', avatar: '/avatars/02.png' },
    { id: 'u3', username: 'manager2', role: 'MANAGER', storeId: 's2', name: 'Charlie Manager', avatar: '/avatars/03.png' },
    { id: 'u4', username: 'staff1', role: 'STAFF', storeId: 's1', name: 'David Staff', avatar: '/avatars/04.png' },
    { id: 'u5', username: 'staff2', role: 'STAFF', storeId: 's1', name: 'Eve Staff', avatar: '/avatars/05.png' },
    { id: 'u6', username: 'staff3', role: 'STAFF', storeId: 's2', name: 'Frank Staff', avatar: '/avatars/06.png' },
];

export const STORES: Store[] = [
    { id: 's1', name: 'Downtown Supercenter', totalShelves: 120, healthScore: 92 },
    { id: 's2', name: 'suburb Local', totalShelves: 45, healthScore: 78 },
];

export const SHELVES: Shelf[] = [
    // Store 1
    { id: 'sh1', storeId: 's1', name: 'Cereal Aisle', category: 'Breakfast', aisle: '45', status: 'STOCKED', lastUpdate: new Date().toISOString() },
    { id: 'sh2', storeId: 's1', name: 'Soda Bay', category: 'Beverages', aisle: '12', status: 'EMPTY', lastUpdate: new Date(Date.now() - 3600000).toISOString(), confidence: 0.98 },
    { id: 'sh3', storeId: 's1', name: 'Dairy Fridge', category: 'Dairy', aisle: '2', status: 'LOW', lastUpdate: new Date(Date.now() - 7200000).toISOString(), confidence: 0.85 },
    { id: 'sh4', storeId: 's1', name: 'Chips Wall', category: 'Snacks', aisle: '8', status: 'STOCKED', lastUpdate: new Date().toISOString() },
    // Store 2
    { id: 'sh5', storeId: 's2', name: 'Bread Shelf', category: 'Bakery', aisle: 'B1', status: 'EMPTY', lastUpdate: new Date().toISOString(), confidence: 0.99 },
];

export const ALERTS: Alert[] = [
    { id: 'a1', shelfId: 'sh2', storeId: 's1', type: 'EMPTY_SHELF', status: 'PENDING', createdAt: new Date(Date.now() - 3600000).toISOString(), description: 'Detected empty shelf via camera feed' },
    { id: 'a2', shelfId: 'sh5', storeId: 's2', type: 'EMPTY_SHELF', status: 'IN_PROGRESS', assignedTo: 'u6', createdAt: new Date(Date.now() - 1800000).toISOString(), description: 'Customer reported empty shelf' },
    { id: 'a3', shelfId: 'sh3', storeId: 's1', type: 'LOW_STOCK', status: 'RESOLVED', assignedTo: 'u5', createdAt: new Date(Date.now() - 86400000).toISOString(), resolvedAt: new Date(Date.now() - 80000000).toISOString(), description: 'Restock initiated' },
];
