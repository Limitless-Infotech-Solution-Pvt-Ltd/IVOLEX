import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Category</h1>
      <div className="bg-card p-8 rounded-lg shadow-soft">
        <CategoryForm />
      </div>
    </div>
  );
}
