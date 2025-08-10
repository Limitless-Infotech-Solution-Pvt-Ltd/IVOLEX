"use client";

import { Star } from "lucide-react";
import { toast } from "sonner";
import { toast } from "sonner";
import { Product } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useRecentlyViewedStore } from "@/lib/store/recently-viewed";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);
  const { addItem: addRecentlyViewed } = useRecentlyViewedStore();

  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [product.id, addRecentlyViewed]);

  return (
    <div className="md:sticky top-24 h-fit">
      <h1 className="text-4xl font-extrabold tracking-tight">{product.name}</h1>
      <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>

      <div className="flex items-center mt-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <p className="ml-2 text-sm text-muted-foreground">({product.rating} / 5)</p>
      </div>

      <p className="mt-6 text-foreground/80">{product.description}</p>

      <div className="mt-8">
        <p className="font-semibold">Stock: <span className="text-green-600">{product.stock} available</span></p>
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          size="lg"
          className="flex-1"
          onClick={() => {
            addItem(product);
            toast.success(`${product.name} has been added to your cart.`);
          }}
        >
          Add to Cart
        </Button>
        <Button size="lg" variant="secondary" className="flex-1">
          Buy Now
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="p-3"
          onClick={() => {
            toggleItem(product.id);
            toast.success(isWishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
          }}
        >
          <Heart className={cn("h-6 w-6", isWishlisted && "fill-red-500 text-red-500")} />
        </Button>
      </div>
    </div>
  );
}
