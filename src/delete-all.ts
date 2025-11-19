import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Clear existing data (optional)
  await prisma.review.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data...');

  // Display summary
  const totalUsers = await prisma.user.count();
  const totalMovies = await prisma.movie.count();
  const totalReviews = await prisma.review.count();

  console.log('\n🎉 Deletion completed!');
  console.log(`📊 Summary:`);
  console.log(`   Users: ${totalUsers}`);
  console.log(`   Movies: ${totalMovies}`);
  console.log(`   Reviews: ${totalReviews}`);
};

main()
  .catch((e) => {
    console.error('❌ Error during deleting all the tables information:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
