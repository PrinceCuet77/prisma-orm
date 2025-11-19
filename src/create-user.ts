import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.brown@email.com',
  },
  {
    name: 'Diana Prince',
    email: 'diana.prince@email.com',
  },
  {
    name: 'Ethan Hunt',
    email: 'ethan.hunt@email.com',
  },
];

const main = async () => {
  // clear existing data
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data...');

  // Create Users
  const users = await prisma.user.createMany({
    data: userData,
  });

  console.log('👥 Created users:', users.count);

  // Get created users
  const createdUsers = await prisma.user.findMany();

  console.log("🚀 ~ main ~ createdUsers:", createdUsers)
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
