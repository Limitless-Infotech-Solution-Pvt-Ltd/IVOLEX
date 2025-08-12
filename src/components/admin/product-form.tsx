"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import { Product, Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "../ui/image-upload";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock: z.coerce.number().int("Stock must be an integer"),
  categoryId: z.string().min(1, "Category is required"),
  images: z.array(z.string().url("Must be a valid URL")).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: Product | null;
  categories: Category[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price)),
    } : {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      images: [],
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.put(`/api/products/${initialData.id}`, data);
      } else {
        await axios.post(`/api/products`, data);
      }
      router.refresh();
      router.push("/admin/products");
      toast.success(`Product ${initialData ? 'updated' : 'created'}.`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    const data = form.getValues();
    const params = new URLSearchParams();
    params.set('preview', 'true');
    params.set('name', data.name);
    params.set('description', data.description || '');
    params.set('price', String(data.price));
    if (data.images && data.images.length > 0) {
      params.set('image', data.images[0]);
    }
    window.open(`/products/${initialData?.id}?${params.toString()}`, '_blank');
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register("name")} disabled={isLoading} />
          {form.formState.errors.name && <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" {...form.register("price")} disabled={isLoading} />
           {form.formState.errors.price && <p className="text-destructive text-sm">{form.formState.errors.price.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" {...form.register("stock")} disabled={isLoading} />
           {form.formState.errors.stock && <p className="text-destructive text-sm">{form.formState.errors.stock.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <Select onValueChange={(value) => form.setValue("categoryId", value)} defaultValue={form.getValues("categoryId")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           {form.formState.errors.categoryId && <p className="text-destructive text-sm">{form.formState.errors.categoryId.message}</p>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...form.register("description")} disabled={isLoading} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Images</Label>
          <ImageUpload
            value={form.watch('images') || []}
            disabled={isLoading}
            onChange={(url) => form.setValue('images', [...(form.getValues('images') || []), url])}
            onRemove={(url) => form.setValue('images', (form.getValues('images') || []).filter((current) => current !== url))}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
        {initialData && (
          <Button type="button" variant="outline" onClick={handlePreview}>
            Preview
          </Button>
        )}
      </div>
    </form>
  );
}
