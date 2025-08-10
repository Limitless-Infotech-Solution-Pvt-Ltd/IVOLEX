"use client";

import { useQuickViewStore } from "@/lib/store/quick-view";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductDetails } from "./product-details";
import Image from "next/image";

export function ProductQuickView() {
  const { isOpen, product, closeModal } = useQuickViewStore();

  if (!product) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative flex items-center justify-center">
            {/* A simplified gallery or just the main image */}
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-lg object-contain max-h-[400px]"
              />
            )}
          </div>
          <ProductDetails product={product} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
