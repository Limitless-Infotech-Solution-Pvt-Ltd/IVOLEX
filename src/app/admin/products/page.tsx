"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { Product } from "@prisma/client";

// Define a separate component for the actions to avoid the window hack
function ActionsCell({ product, onDelete }: { product: Product, onDelete: (id: string) => void }) {
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
        <DropdownMenuItem onClick={() => router.push(`/admin/products/${product.id}/edit`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(product.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);

  const fetchProducts = React.useCallback(async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId: string) => {
    const originalProducts = [...products];
    // Optimistically update the UI
    setProducts(originalProducts.filter(p => p.id !== productId));

    toast.promise(
      axios.delete(`/api/products/${productId}`),
      {
        loading: 'Deleting product...',
        success: 'Product deleted successfully.',
        error: (err) => {
          // Revert the UI on failure
          setProducts(originalProducts);
          return err.response?.data?.message || 'Failed to delete product.';
        },
      }
    );
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell product={row.original} onDelete={handleDelete} />,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={products} filterColumn="name" />
    </div>
  );
}
