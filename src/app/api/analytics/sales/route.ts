import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    const salesByDay = orders.reduce((acc, order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += order.total;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.keys(salesByDay).map(date => ({
      name: date,
      total: salesByDay[date],
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    console.error('[SALES_ANALYTICS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
