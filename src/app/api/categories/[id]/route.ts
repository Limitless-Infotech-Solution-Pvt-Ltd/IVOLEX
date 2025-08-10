import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORY_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const body = await req.json();
    const { name, description, image, slug } = body;

    if (!name || !slug) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        description,
        image,
        slug,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORY_PUT]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const category = await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORY_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
