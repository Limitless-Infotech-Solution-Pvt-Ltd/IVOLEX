import { ProductForm } from "@/components/admin/product-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <div className="bg-card p-8 rounded-lg shadow-soft">
        <ProductForm initialData={product} categories={categories} />
      </div>
    </div>
  );
}
