"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/definitions";

interface CartItemProps {
  item: Product & { quantity: number };
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-24 w-24 rounded-lg overflow-hidden">
        {item.images?.[0] && (
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`}>
          <h3 className="font-semibold text-lg hover:text-primary">{item.name}</h3>
        </Link>
        <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          size="icon"
          variant="outline"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="font-semibold text-lg">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <div>
        <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
