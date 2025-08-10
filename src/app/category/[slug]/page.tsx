import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getCategoryBySlug } from "@/lib/api";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-neutral-900">
          {category.image && (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover z-0 opacity-50"
            />
          )}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-5xl font-extrabold tracking-tight">{category.name}</h1>
            <p className="mt-4 text-lg max-w-2xl">{category.description}</p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">
              Products in {category.name}
            </h2>
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid category={category.name} />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
