"use client";

import * as React from "react";
import { useWishlistStore } from "@/lib/store/wishlist";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/definitions";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function WishlistPage() {
  const { itemIds } = useWishlistStore();
  const [wishlistProducts, setWishlistProducts] = React.useState<Product[]>([]);

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">My Wishlist</h1>
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Your wishlist is empty.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
