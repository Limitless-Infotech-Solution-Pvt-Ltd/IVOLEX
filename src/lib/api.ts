import { Product, Category, Order } from './definitions';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    // Return null or handle as you see fit when a product isn't found
    if (res.status === 404) return null;
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const res = await fetch(`${API_URL}/categories/slug/${slug}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch category');
  }
  return res.json();
}

export async function getOrders(): Promise<Order[]> {
    const mockOrders: Order[] = [
      { id: 'ORD-001', date: '2023-10-26', status: 'Delivered', total: 1429.98, items: [] },
    ];
    return Promise.resolve(mockOrders);
}
