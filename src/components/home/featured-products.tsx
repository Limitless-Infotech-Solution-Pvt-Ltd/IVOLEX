import { Product } from "@/lib/definitions";
import { ProductCard } from "@/components/product-card";

interface FeaturedProductsProps {
  products: Product[];
  title: string;
}

export function FeaturedProducts({ products, title }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
