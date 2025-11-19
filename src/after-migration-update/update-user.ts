import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const allUser = await prisma.user.findMany();
  // console.log('🚀 ~ main ~ allUser:', allUser);

  for (let index = 0; index < allUser.length; index++) {
    const user = allUser[index];
    if (!user) continue;
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        age: 15 + index + 2,
      },
    });
    console.log('🚀 ~ main ~ updatedUser:', updatedUser);
  }
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
