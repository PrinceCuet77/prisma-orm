import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Q-1: Find all movies in the `Sci-Fi` genre released before `2015`
  // ----------------------- END OF Q-1 -----------------------
  // Q-2: Find users who have both reviewed a movie `AND` have movies in their `favoriteMovies`
  // ----------------------- END OF Q-2 -----------------------
  // Q-3: Find reviews with ratings between `4` and `7` stars
  // ----------------------- END OF Q-3 -----------------------
  // Q-4: Get the 5 most recently released movies
  // ----------------------- END OF Q-4 -----------------------
  // Q-5: Get the top 3 movies with the highest average ratings
  // ----------------------- END OF Q-5 -----------------------
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
