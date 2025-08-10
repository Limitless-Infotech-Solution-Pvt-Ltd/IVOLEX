"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const accountNavItems = [
  { name: "Profile", href: "/account/profile" },
  { name: "Orders", href: "/account/orders" },
  { name: "Wishlist", href: "/account/wishlist" },
  { name: "Settings", href: "/account/settings" },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">My Account</h1>
        <div className="grid lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1">
            <nav className="flex flex-col space-y-2">
              {accountNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-lg font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
