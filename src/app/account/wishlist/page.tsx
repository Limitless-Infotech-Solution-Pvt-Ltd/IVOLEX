"use client";

import * as React from "react";
import { useWishlistStore } from "@/lib/store/wishlist";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/definitions";
import { ProductCard } from "@/components/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { itemIds } = useWishlistStore();
  const [wishlistProducts, setWishlistProducts] = React.useState<Product[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchWishlistProducts = async () => {
      const allProducts = await getProducts();
      const filtered = allProducts.filter(p => itemIds.includes(p.id));
      setWishlistProducts(filtered);
    };

    if (itemIds.length > 0) {
      fetchWishlistProducts();
    } else {
      setWishlistProducts([]);
    }
  }, [itemIds]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Heart className="h-16 w-16" />}
          title="Your wishlist is empty"
          description="You haven't added any products to your wishlist yet. Browse our products and save your favorites!"
          action={{
            label: "Browse Products",
            onClick: () => router.push("/products"),
          }}
        />
      )}
    </div>
  );
}
