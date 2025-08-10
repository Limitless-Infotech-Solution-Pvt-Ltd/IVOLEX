"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const shippingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "ZIP code is required"),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onNext: (data: ShippingFormValues) => void;
}

export function ShippingForm({ onNext }: ShippingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-2xl font-bold">Shipping Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register("address")} />
           {errors.address && <p className="text-destructive text-sm">{errors.address.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} />
           {errors.city && <p className="text-destructive text-sm">{errors.city.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP Code</Label>
          <Input id="zip" {...register("zip")} />
           {errors.zip && <p className="text-destructive text-sm">{errors.zip.message}</p>}
        </div>
      </div>
      <Button type="submit" className="w-full" size="lg">Next: Payment</Button>
    </form>
  );
}
