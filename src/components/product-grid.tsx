import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product-card";

interface ProductGridProps {
  category?: string;
  limit?: number;
  excludeId?: string;
}

export async function ProductGrid({ category, limit, excludeId }: ProductGridProps) {
  let products = await getProducts();

  if (category) {
    products = products.filter(p => p.category === category);
  }

  if (excludeId) {
    products = products.filter(p => p.id !== excludeId);
  }

  if (limit) {
    products = products.slice(0, limit);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
