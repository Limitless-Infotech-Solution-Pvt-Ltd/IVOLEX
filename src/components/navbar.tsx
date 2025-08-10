"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search as SearchComponent } from "@/components/search/search";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Furniture", href: "/category/furniture" },
  { name: "EV Electronics", href: "/category/ev-electronics" },
  { name: "Leather", href: "/category/leather" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
    },
    hover: {
      scale: 1.04,
      y: -2,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    },
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-micro ease-custom-ease",
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* <Icons.logo className="h-8 w-8" /> */}
          <span className="text-2xl font-bold">IVOLEX</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-lg font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-foreground/60"
                )}
              >
                <motion.div variants={buttonVariants} whileHover="hover" initial="rest">
                  {item.name}
                </motion.div>
                {isActive && (
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                    layoutId="active-underline"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <div className="w-64">
            <SearchComponent />
          </div>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background/95">
          <nav className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-lg font-medium",
                  pathname === item.href ? "text-primary" : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Search className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
