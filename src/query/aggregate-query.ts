import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Q-1: Retrieve how many reviews exist and give the total reviews for each movie
  const totalReviews = await prisma.movie.count();
  console.log('🚀 ~ main ~ totalReviews:', totalReviews);

  const totalReviewsForEachMovie = await prisma.movie.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          movieReviews: true,
        },
      },
    },
  });
  console.log(
    '🚀 ~ main ~ totalReviewsForEachMovie:',
    totalReviewsForEachMovie
  );

  const moreThen2Reviews = totalReviewsForEachMovie.filter(
    (movie) => movie._count.movieReviews >= 2
  );
  console.log('🚀 ~ main ~ moreThen2Reviews:', moreThen2Reviews);
  // ----------------------- END OF Q-1 -----------------------
  // Q-2: Retrieve each movie's average rating

  // ----------------------- END OF Q-2 -----------------------
  // Q-3: Find how many reviews each movie has (confusion)
  // ----------------------- END OF Q-3 -----------------------
  // Q-4: Find who gave the minimum rating and which movie has the maximum rating
  // ----------------------- END OF Q-4 -----------------------
  // Q-5: Find which movies have an average rating greater than 7
  // ----------------------- END OF Q-5 -----------------------
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
