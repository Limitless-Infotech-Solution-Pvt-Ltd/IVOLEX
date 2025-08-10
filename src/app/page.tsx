import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/api";

import { Carousel } from "@/components/carousel";
import { CategoryCTA } from "@/components/home/category-cta";
import { CategoryStrip } from "@/components/home/category-strip";
import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { RecentlyViewed } from "@/components/home/recently-viewed";

export default async function Home() {
  // Fetch data that doesn't need to be suspended
  const categories = await getCategories();
  const carouselProducts = await getProducts(); // Assuming you want specific products for carousel

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Carousel products={carouselProducts.slice(0, 5)} />
        <CategoryCTA />
        <CategoryStrip categories={categories} />

        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Trending Now</h2>
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid limit={4} />
            </Suspense>
          </div>
        </section>
        <RecentlyViewed />
      </main>
      <Footer />
    </div>
  );
}
