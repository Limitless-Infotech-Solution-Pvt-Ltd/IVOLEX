import { Product, Category, Order } from './definitions';
import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then(res => res.data);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/api/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const res = await fetch(`${API_BASE_URL}/api/categories/slug/${slug}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch category');
  }
  return res.json();
}

export async function getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE_URL}/api/orders`);
    if (!res.ok) {
        throw new Error('Failed to fetch orders');
    }
    return res.json();
}
