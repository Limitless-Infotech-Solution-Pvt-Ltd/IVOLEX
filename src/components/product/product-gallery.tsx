"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = React.useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
        <Image
          src={activeImage}
          alt="Product image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative w-24 h-24 rounded-lg overflow-hidden border-2",
              image === activeImage ? "border-primary" : "border-transparent"
            )}
            onClick={() => setActiveImage(image)}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
