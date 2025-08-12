import prisma from "@/lib/prisma";
import { CreditCard, DollarSign, Package, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { SalesChart } from "@/components/admin/charts/sales-chart";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className={cn("bg-card p-6 rounded-lg shadow-soft border-l-4", color)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [userCount, productCount, orderCount, totalSales] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: {
        total: true,
      },
    }),
  ]);

  const sales = totalSales._sum.total || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Sales" value={`$${sales.toFixed(2)}`} icon={DollarSign} color="border-primary" />
        <StatCard title="Total Orders" value={orderCount.toString()} icon={CreditCard} color="border-accent" />
        <StatCard title="Total Products" value={productCount.toString()} icon={Package} color="border-success" />
        <StatCard title="Total Customers" value={userCount.toString()} icon={Users} color="border-destructive" />
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-soft">
          <h2 className="text-xl font-bold mb-4">Sales Over Time</h2>
          <SalesChart />
        </div>
        <div className="bg-card p-6 rounded-lg shadow-soft">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">No recent activity to display.</p>
            {/* Activity items will be mapped here */}
          </div>
        </div>
      </div>
    </div>
  );
}
