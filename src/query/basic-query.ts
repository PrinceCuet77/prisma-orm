import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Q-1: Update the age of at least three users
  const usersToUpdate = await prisma.user.findMany({
    take: 3,
  });

  for (let index = 0; index < usersToUpdate.length; index++) {
    const user = usersToUpdate[index];
    if (!user) continue;
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { age: 20 + index },
    });
    console.log('🚀 ~ main ~ updatedUser:', updatedUser);
  }
  // ----------------------- END OF Q-1 -----------------------

  // Q-2: Find users whose age is less than 18
  const usersAgeLessThan18 = await prisma.user.findMany({
    where: {
      age: {
        lt: 18,
      },
    },
  });
  console.log('🚀 ~ main ~ usersAgeLessThan18:', usersAgeLessThan18);
  // ----------------------- END OF Q-2 -----------------------

  // Q-3: Find and update users whose age is greater than 21
  const usersAgeGreaterThanOrEqual21 = await prisma.user.findMany({
    where: {
      age: {
        gte: 21,
      },
    },
  });

  for (const user of usersAgeGreaterThanOrEqual21) {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { district: 'Updated District' },
    });
    console.log('🚀 ~ main ~ updatedUser:', updatedUser);
  }
  // ----------------------- END OF Q-3 -----------------------
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
