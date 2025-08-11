import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create Admin User
  const adminPassword = await bcrypt.hash('password123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      hashedPassword: adminPassword,
      role: UserRole.ADMIN,
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // Create Categories
  const furniture = await prisma.category.upsert({
    where: { slug: 'furniture' },
    update: {},
    create: { name: 'Furniture', slug: 'furniture', description: 'High-quality furniture for every room.' },
  });

  const electronics = await prisma.category.upsert({
    where: { slug: 'ev-electronics' },
    update: {},
    create: { name: 'EV Electronics', slug: 'ev-electronics', description: 'Cutting-edge electronics.' },
  });

  const leather = await prisma.category.upsert({
    where: { slug: 'leather' },
    update: {},
    create: { name: 'Leather Goods', slug: 'leather', description: 'Handcrafted leather goods.' },
  });

  console.log('Created categories');

  // Create Products
  await prisma.product.upsert({
    where: { name: 'Modern Leather Sofa' },
    update: {},
    create: {
      name: 'Modern Leather Sofa',
      price: 1299.99,
      description: 'A beautiful and comfortable modern leather sofa.',
      images: ['https://images.unsplash.com/photo-1540574163024-588462b3b7c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      categoryId: furniture.id,
      stock: 15,
      rating: 4.5,
    },
  });

  await prisma.product.upsert({
    where: { name: 'Ergonomic Office Chair' },
    update: {},
    create: {
      name: 'Ergonomic Office Chair',
      price: 499.00,
      description: 'An ergonomic office chair that provides comfort and support.',
      images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      categoryId: furniture.id,
      stock: 30,
      rating: 4.8,
    },
  });

  await prisma.product.upsert({
    where: { name: 'Wireless Charging Pad' },
    update: {},
    create: {
      name: 'Wireless Charging Pad',
      price: 79.50,
      description: 'A sleek and fast wireless charging pad.',
      images: ['https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      categoryId: electronics.id,
      stock: 100,
      rating: 4.2,
    },
  });

  console.log('Created products');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
