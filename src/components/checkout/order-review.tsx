"use client";

import { Button } from "@/components/ui/button";

interface OrderReviewProps {
  shippingData: any;
  paymentData: any;
  onBack: () => void;
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
}

export function OrderReview({
  shippingData,
  paymentData,
  onBack,
  onPlaceOrder,
  isPlacingOrder,
}: OrderReviewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Your Order</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Shipping To:</h3>
          <p>{shippingData.name}</p>
          <p>{shippingData.address}</p>
          <p>{shippingData.city}, {shippingData.zip}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Payment Method:</h3>
          <p>Card ending in ****{paymentData.cardNumber.slice(-4)}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>Back to Payment</Button>
        <Button onClick={onPlaceOrder} disabled={isPlacingOrder} size="lg">
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
