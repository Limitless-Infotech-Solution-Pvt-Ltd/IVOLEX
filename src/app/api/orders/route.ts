import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Product } from '@/lib/definitions';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

interface CartItem extends Product {
  quantity: number;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('[ORDERS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("No items in cart", { status: 400 });
    }

    // In a real app, you'd get the userId from the session/auth token
    const hardcodedUserId = "clx..."; // Replace with a real user ID from your DB for testing

    // For simplicity, we trust the prices from the frontend.
    // In a real app, you should fetch product prices from the DB to ensure they haven't changed.
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId: hardcodedUserId,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('[ORDER_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
