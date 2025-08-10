"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon } from "lucide-react";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/definitions";
import { useDebounce } from "@/lib/hooks/use-debounce";

export function Search() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    const fetchAllProducts = async () => {
      const products = await getProducts();
      setAllProducts(products);
    };
    fetchAllProducts();
  }, []);

  React.useEffect(() => {
    if (debouncedQuery) {
      const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, allProducts]);

  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-lg bg-card shadow-lg border z-50 max-h-96 overflow-y-auto">
          <ul>
            {results.map(product => (
              <li key={product.id}>
                <Link href={`/products/${product.id}`} className="flex items-center gap-4 p-4 hover:bg-muted" onClick={() => setQuery('')}>
                  {product.images?.[0] && (
                    <Image src={product.images[0]} alt={product.name} width={40} height={40} className="rounded-md" />
                  )}
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
