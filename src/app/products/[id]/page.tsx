import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";

import { getProductById, getProducts } from "@/lib/api";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductGallery } from "@/components/product/product-gallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product-card";
import { ProductViewer } from "@/components/product/product-viewer";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProducts()).filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <ProductGallery images={product.images || []} />
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
              <Button size="lg" className="flex-1">Add to Cart</Button>
              <Button size="lg" variant="secondary" className="flex-1">Buy Now</Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="specs" className="py-4">
              <p>Specifications for {product.name} will be listed here.</p>
            </TabsContent>
            <TabsContent value="reviews" className="py-4">
              <p>Reviews for {product.name} will be listed here.</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Experience in 3D</h2>
          <ProductViewer />
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
