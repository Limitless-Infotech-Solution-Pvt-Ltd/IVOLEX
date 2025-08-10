"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(16),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Must be in MM/YY format"),
  cvc: z.string().min(3, "CVC must be 3 digits").max(3),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onNext: (data: PaymentFormValues) => void;
  onBack: () => void;
}

export function PaymentForm({ onNext, onBack }: PaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Information</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input id="card-number" {...register("cardNumber")} />
          {errors.cardNumber && <p className="text-destructive text-sm">{errors.cardNumber.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" placeholder="MM/YY" {...register("expiry")} />
            {errors.expiry && <p className="text-destructive text-sm">{errors.expiry.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" {...register("cvc")} />
            {errors.cvc && <p className="text-destructive text-sm">{errors.cvc.message}</p>}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>Back to Shipping</Button>
        <Button type="submit" size="lg">Next: Review Order</Button>
      </div>
    </form>
  );
}
