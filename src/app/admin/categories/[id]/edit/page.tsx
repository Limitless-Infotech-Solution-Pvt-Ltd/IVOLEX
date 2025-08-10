import { CategoryForm } from "@/components/admin/category-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const category = await prisma.category.findUnique({ where: { id: params.id } });

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Category</h1>
      <div className="bg-card p-8 rounded-lg shadow-soft">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
