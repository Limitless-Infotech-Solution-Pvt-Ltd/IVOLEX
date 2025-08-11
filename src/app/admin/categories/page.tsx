"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { Category } from "@prisma/client";

function ActionsCell({ category, onDelete }: { category: Category, onDelete: (id: string) => void }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/admin/categories/${category.id}/edit`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(category.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const fetchCategories = React.useCallback(async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (categoryId: string) => {
    const originalCategories = [...categories];
    setCategories(originalCategories.filter(c => c.id !== categoryId));

    toast.promise(
      axios.delete(`/api/categories/${categoryId}`),
      {
        loading: 'Deleting category...',
        success: 'Category deleted successfully.',
        error: (err) => {
          setCategories(originalCategories);
          return err.response?.data?.message || 'Failed to delete category.';
        },
      }
    );
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell category={row.original} onDelete={handleDelete} />,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={() => useRouter().push("/admin/categories/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </div>
      <DataTable columns={columns} data={categories} filterColumn="name" />
    </div>
  );
}
