import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (!params.slug) {
      return new NextResponse("Category slug is required", { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: {
        slug: params.slug,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORY_BY_SLUG_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
