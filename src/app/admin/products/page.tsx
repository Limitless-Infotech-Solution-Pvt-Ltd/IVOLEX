"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import useSWR from 'swr';
import { toast } from "sonner";
import axios from "axios";

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
import { Product } from "@prisma/client";

type PaginatedProductsResponse = {
  data: Product[];
  pageInfo: {
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

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
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // SWR is 0-indexed, but our API is 1-indexed
    pageSize: 10,
  });

  const { data, error, mutate } = useSWR<PaginatedProductsResponse>(
    `/api/products?page=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}`,
    fetcher
  );

  const products = data?.data || [];
  const pageCount = data?.pageInfo.totalPages || 0;

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      mutate(); // Revalidate the data
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
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

  if (error) return <div>Failed to load products</div>;
  if (!data) return <div>Loading...</div>;

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
      <DataTable
        columns={columns}
        data={products}
        pageCount={pageCount}
        onPaginationChange={setPagination}
        pagination={pagination}
        filterColumn="name"
      />
    </div>
  );
}
