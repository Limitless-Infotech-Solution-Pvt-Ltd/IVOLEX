"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories, getProducts } from "@/lib/api";
import { Product, Category } from "@/lib/definitions";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [filters, setFilters] = React.useState({ priceRange: [0, 2000], categories: [] });
  const [sortKey, setSortKey] = React.useState("newest");

  React.useEffect(() => {
    const fetchData = async () => {
      const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()]);
      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    let result = [...products];

    // Apply filters
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category as any));
    }

    // Apply sorting
    switch (sortKey) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // newest
        // Assuming products are already somewhat sorted by date, or would need a date field
        break;
    }

    setFilteredProducts(result);
  }, [filters, sortKey, products]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">All Products</h1>
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProductFilters categories={categories} onFilterChange={setFilters} onSortChange={setSortKey} />
            </div>
          </div>
          <motion.div layout className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
