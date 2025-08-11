"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/cart-item";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="h-16 w-16" />}
            title="Your cart is empty"
            description="Looks like you haven't added anything to your cart yet. Let's find something you'll love."
            action={{
              label: "Continue Shopping",
              onClick: () => router.push("/"),
            }}
          />
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Items</h2>
                <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
              </div>
              <div>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 bg-card rounded-2xl shadow-soft">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal ({totalItems()} items)</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t my-4" />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full mt-6 as-child">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
