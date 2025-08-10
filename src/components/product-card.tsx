"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Product } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useQuickViewStore } from "@/lib/store/quick-view";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { openModal } = useQuickViewStore();
  const isWishlisted = isInWishlist(product.id);

  const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    rest: { boxShadow: "0 0 0px 0px hsla(var(--primary), 0)" },
    hover: { boxShadow: "0 0 20px 5px hsla(var(--primary), 0.3)" },
  };

  const actionsVariants = {
    rest: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const actionItemVariants = {
    rest: { y: 10, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial="rest"
      className={cn("relative text-center", className)}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <motion.div
          variants={imageVariants}
          className="relative w-56 h-56 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden shadow-md bg-card"
        >
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-black/20 rounded-full" />
          <motion.div
            variants={actionsVariants}
            className="absolute inset-0 flex items-center justify-center gap-4"
          >
            <motion.div variants={actionItemVariants}>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-12 w-12"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleItem(product.id);
                  toast.success(isWishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
                }}
              >
                <Heart className={cn("h-6 w-6", isWishlisted && "fill-red-500 text-red-500")} />
              </Button>
            </motion.div>
            <motion.div variants={actionItemVariants}>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-12 w-12"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal(product);
                }}
              >
                <Eye className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="mt-4">
          <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
          <p className="mt-1 text-xl font-extrabold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <motion.div
        variants={actionItemVariants}
        className="absolute bottom-16 right-0"
      >
        <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
          <ShoppingCart className="h-6 w-6" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
