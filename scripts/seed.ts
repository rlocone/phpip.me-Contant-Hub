import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create initial categories
  const categories = [
    {
      name: 'Cybersecurity',
      slug: 'cybersecurity',
      description: 'Articles about cybersecurity threats, defenses, and best practices',
    },
    {
      name: 'Privacy',
      slug: 'privacy',
      description: 'Privacy-focused content, tools, and techniques',
    },
    {
      name: 'Hardware',
      slug: 'hardware',
      description: 'Hardware reviews, security, and technology',
    },
    {
      name: 'AI',
      slug: 'ai',
      description: 'Artificial Intelligence news and developments',
    },
  ];

  console.log('📁 Creating categories...');
  for (const category of categories) {
    const existing = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!existing) {
      await prisma.category.create({
        data: category,
      });
      console.log(`  ✓ Created category: ${category.name}`);
    } else {
      console.log(`  → Category already exists: ${category.name}`);
    }
  }

  // Create admin users (passwords from env vars — never hardcode)
  const users = [
    {
      email: process.env.SEED_ADMIN_EMAIL || 'admin@phipi.tech',
      password: process.env.SEED_ADMIN_PASSWORD,
      name: process.env.SEED_ADMIN_NAME || 'Admin User',
      role: 'admin',
    },
  ];

  if (!users[0].password) {
    console.warn('⚠️  SEED_ADMIN_PASSWORD not set — skipping admin user creation');
    console.log('✅ Database seeding completed!');
    await prisma.$disconnect();
    return;
  }

  console.log('👤 Creating admin users...');
  for (const user of users) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
          role: user.role,
        },
      });
      console.log(`  ✓ Created admin user: ${user.email}`);
    } else {
      console.log(`  → Admin user already exists: ${user.email}`);
    }
  }

  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
