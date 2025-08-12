"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import useSWR from 'swr';
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";

import { fetcher } from "@/lib/api";
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
  const { data: categories, error, mutate } = useSWR<Category[]>('/api/categories', fetcher);

  const handleDelete = async (categoryId: string) => {
    const originalCategories = categories ? [...categories] : [];
    mutate(originalCategories.filter(c => c.id !== categoryId), false);

    try {
      await axios.delete(`/api/categories/${categoryId}`);
      toast.success("Category deleted successfully.");
    } catch (error) {
      mutate(originalCategories, false);
      toast.error("Failed to delete category.");
    }
  };

  if (error) return <div>Failed to load categories</div>;
  if (!categories) return <div>Loading...</div>;

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
