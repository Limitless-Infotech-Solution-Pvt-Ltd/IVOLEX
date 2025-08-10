"use client";

import * as React from "react";
import { useRecentlyViewedStore } from "@/lib/store/recently-viewed";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/definitions";
import { ProductCard } from "@/components/product-card";

export function RecentlyViewed() {
  const { itemIds } = useRecentlyViewedStore();
  const [recentlyViewedProducts, setRecentlyViewedProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchRecentlyViewedProducts = async () => {
      const allProducts = await getProducts();
      // Keep the order from the recently viewed store
      const filtered = itemIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
      setRecentlyViewedProducts(filtered);
    };

    if (itemIds.length > 0) {
      fetchRecentlyViewedProducts();
    }
  }, [itemIds]);

  if (recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recentlyViewedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
