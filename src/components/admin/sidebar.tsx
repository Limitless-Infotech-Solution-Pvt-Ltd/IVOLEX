"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  ShoppingCart,
  Users,
  Tag,
  FileText,
  Settings,
  Shield,
  BarChart,
  History,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Box, badge: 24 },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: 8 },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Promotions", href: "/admin/promotions", icon: Tag },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Menus", href: "/admin/menus", icon: Settings },
  { name: "Users & Roles", href: "/admin/users", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Audit Logs", href: "/admin/logs", icon: History },
  { name: "API Keys", href: "/admin/api-keys", icon: Key },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-card text-card-foreground border-r fixed flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <Shield className="h-8 w-8 text-accent" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          IVOLEX Admin
        </h2>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {adminNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors relative border-l-4",
              pathname.startsWith(item.href)
                ? "bg-muted border-accent text-white"
                : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-white"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
