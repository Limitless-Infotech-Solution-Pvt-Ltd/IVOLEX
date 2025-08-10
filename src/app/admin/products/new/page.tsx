import { ProductForm } from "@/components/admin/product-form";
import prisma from "@/lib/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      <div className="bg-card p-8 rounded-lg shadow-soft">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
