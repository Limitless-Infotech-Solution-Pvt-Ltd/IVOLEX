"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { PaymentForm } from "@/components/checkout/payment-form";
import { OrderReview } from "@/components/checkout/order-review";

function OrderSummary() {
  const { items, totalPrice } = useCartStore();
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 p-6 bg-card rounded-2xl shadow-soft">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                <Image src={item.images?.[0] || ''} alt={item.name} fill className="object-cover" />
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{item.name}</p>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t my-4" />
        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>${totalPrice().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = React.useState(1);
  const [shippingData, setShippingData] = React.useState(null);
  const [paymentData, setPaymentData] = React.useState(null);

  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await axios.post('/api/orders', { items, shippingData, paymentData });
      toast.success("Order placed successfully!");
      clearCart();
      router.push('/account/orders');
    } catch (error) {
      toast.error("Failed to place order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleShippingNext = (data: any) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentNext = (data: any) => {
    setPaymentData(data);
    setStep(3);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-center">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {step === 1 && <ShippingForm onNext={handleShippingNext} />}
            {step === 2 && <PaymentForm onNext={handlePaymentNext} onBack={handleBack} />}
            {step === 3 && (
              <OrderReview
                shippingData={shippingData}
                paymentData={paymentData}
                onBack={handleBack}
                onPlaceOrder={handlePlaceOrder}
                isPlacingOrder={isPlacingOrder}
              />
            )}
          </div>
          <OrderSummary />
        </div>
      </main>
      <Footer />
    </div>
  );
}
