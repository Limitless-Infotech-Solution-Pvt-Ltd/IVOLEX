"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { format } from "date-fns";
import { Order, User, OrderItem, Product } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type OrderDetails = Order & {
  user: User;
  items: (OrderItem & { product: Product })[];
};

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = React.useState<OrderDetails | null>(null);
  const [newStatus, setNewStatus] = React.useState<string>("");
  const router = useRouter();

  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${params.id}`);
        setOrder(response.data);
        setNewStatus(response.data.status);
      } catch (error) {
        toast.error("Failed to fetch order details.");
      }
    };
    fetchOrder();
  }, [params.id]);

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`/api/orders/${params.id}`, { status: newStatus });
      toast.success("Order status updated.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-lg shadow-soft">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg shadow-soft">
            <h2 className="text-xl font-bold mb-4">Customer Details</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-soft">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {format(new Date(order.createdAt), "PPP")}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Order Status</label>
              <div className="flex gap-4">
                <Select onValueChange={setNewStatus} defaultValue={order.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleStatusUpdate}>Update</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
