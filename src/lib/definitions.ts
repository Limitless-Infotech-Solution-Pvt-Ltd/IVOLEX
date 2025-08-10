// This file will contain TypeScript type definitions for our data.
// We will add more types here as we build the components.

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  images?: string[];
  category?: string;
  stock?: number;
  rating?: number;
};

export type Category = {
  id: string;
  name:string;
  slug: string;
  description?: string;
  image?: string;
  subcategories?: Category[];
};

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
};
