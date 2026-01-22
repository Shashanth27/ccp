"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Store,
  Library,
  BarChart3,
  Settings,
  Upload,
  AlertTriangle,
  FileText,
  ListTodo,
  LogOut,
  Building2
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/auth-context"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  // Define menus
  const adminMenu = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Stores", url: "/admin/stores", icon: Store },
    { title: "Shelves", url: "/admin/shelves", icon: Library },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    { title: "Settings", url: "/settings", icon: Settings },
  ]

  const managerMenu = [
    { title: "Dashboard", url: "/manager/dashboard", icon: LayoutDashboard },
    { title: "Shelves", url: "/manager/shelves", icon: Library },
    { title: "Upload Image", url: "/manager/upload", icon: Upload },
    { title: "Alerts", url: "/manager/alerts", icon: AlertTriangle },
    { title: "Reports", url: "/reports", icon: FileText },
  ]

  const staffMenu = [
    { title: "My Tasks", url: "/staff/tasks", icon: ListTodo },
    { title: "Alerts", url: "/staff/alerts", icon: AlertTriangle },
  ]

  const getMenu = () => {
    switch (user?.role) {
      case 'ADMIN': return adminMenu;
      case 'MANAGER': return managerMenu;
      case 'STAFF': return staffMenu;
      default: return [];
    }
  }

  const currentMenu = getMenu();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Retail Pulse</span>
                <span className="truncate text-xs">{user?.role || 'Guest'}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={currentMenu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.name || 'User',
          email: user?.username || 'user@example.com',
          avatar: user?.avatar || '/avatars/default.png'
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
