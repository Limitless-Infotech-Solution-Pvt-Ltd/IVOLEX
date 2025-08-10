"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Armchair, Zap, Sparkles } from "lucide-react";

const ctaItems = [
  {
    name: "Shop Furniture",
    href: "/category/furniture",
    icon: <Armchair className="h-16 w-16" />,
  },
  {
    name: "EV Electronics",
    href: "/category/ev-electronics",
    icon: <Zap className="h-16 w-16" />,
  },
  {
    name: "Special Offers",
    href: "/offers",
    icon: <Sparkles className="h-16 w-16" />,
  },
];

const cardVariants = {
  rest: { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
  hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" },
};

export function CategoryCTA() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ctaItems.map((item) => (
            <Link href={item.href} key={item.name}>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                initial="rest"
                className="p-8 rounded-2xl bg-card text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="text-primary">{item.icon}</div>
                <h3 className="text-2xl font-bold text-foreground">{item.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
