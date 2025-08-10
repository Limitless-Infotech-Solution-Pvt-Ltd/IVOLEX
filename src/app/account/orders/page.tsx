import { getOrders } from "@/lib/api";
import { Order } from "@/lib/definitions";
import { Button } from "@/components/ui/button";

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-soft">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">Order #{order.id}</h3>
          <p className="text-sm text-muted-foreground">Date: {order.date}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">${order.total.toFixed(2)}</p>
          <span className={`px-2 py-1 text-xs rounded-full ${
            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {order.status}
          </span>
        </div>
      </div>
      <div>
        {order.items.map(item => (
          <div key={item.productId} className="flex justify-between items-center py-2 border-t">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <Button variant="outline">View Invoice</Button>
        <Button>Track Order</Button>
      </div>
    </div>
  );
}


export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">You have no past orders.</p>
      )}
    </div>
  );
}
