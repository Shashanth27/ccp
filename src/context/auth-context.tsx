"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '@/lib/types';
import { USERS } from '@/lib/mock-data';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    login: (username: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start loading to check session
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Simulate session check
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            const foundUser = USERS.find(u => u.id === storedUserId);
            if (foundUser) {
                setUser(foundUser);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const foundUser = USERS.find(u => u.username === username);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('userId', foundUser.id);

            // Redirect based on role
            switch (foundUser.role) {
                case 'ADMIN':
                    router.push('/admin/dashboard');
                    break;
                case 'MANAGER':
                    router.push('/manager/dashboard');
                    break;
                case 'STAFF':
                    router.push('/staff/tasks');
                    break;
            }
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userId');
        router.push('/login');
    };

    // Route Protection
    useEffect(() => {
        if (isLoading) return;

        if (!user && pathname !== '/login') {
            router.push('/login');
        } else if (user) {
            if (pathname === '/login' || pathname === '/') {
                // Redirect to dashboard if trying to access login while logged in
                const role = user.role;
                if (role === 'ADMIN') router.push('/admin/dashboard');
                if (role === 'MANAGER') router.push('/manager/dashboard');
                if (role === 'STAFF') router.push('/staff/tasks');
            }

            // Check RBAC
            if (pathname.startsWith('/admin') && user.role !== 'ADMIN') {
                router.push('/unauthorized');
            }
            if (pathname.startsWith('/manager') && user.role !== 'MANAGER' && user.role !== 'ADMIN') {
                // Decide if Admin can see Manager views. Requirement says "RBAC controls routes".
                // Usually Admin can see all, but let's stick to strict role flows primarily.
                // User request: "Admin -> /admin/dashboard". "Manager -> /manager/dashboard".
                // "Admin has no upload or alert execution UI". So Admin probably shouldn't be in /manager/upload.
                router.push('/unauthorized');
            }
            if (pathname.startsWith('/staff') && user.role !== 'STAFF' && user.role !== 'MANAGER') { // Managers might view staff tasks? No, strict.
                router.push('/unauthorized');
            }
        }
    }, [user, isLoading, pathname, router]);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
