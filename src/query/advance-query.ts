import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Q-1: Find all movies in the `Sci-Fi` genre released before `2009`
  // Step-01
  // const sciFiMovies = await prisma.movie.findMany({
  //   where: {
  //     genre: 'Sci-Fi',
  //     releaseYear: {
  //       lt: new Date('2009'),
  //     },
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     director: true,
  //     rating: true,
  //     releaseYear: true,
  //   },
  // });

  // Step-02 (using AND operator)
  const sciFiMovies = await prisma.movie.findMany({
    where: {
      AND: [
        {
          genre: 'Sci-Fi',
        },
        {
          releaseYear: {
            lt: new Date('2009'),
          },
        },
      ],
    },
  });
  console.log('🚀 ~ main ~ sciFiMovies:', sciFiMovies);
  // ----------------------- END OF Q-1 -----------------------

  // Q-2: Find users who have both reviewed a movie `AND` have movies in their `favoriteMovies`
  // Step-01
  const users = await prisma.user.findMany({
    where: {
      userReviews: {
        some: {},
      },
      favoriteMovies: {
        some: {},
      },
    },
  });

  // Step-02 (using AND operator)
  // const users = await prisma.user.findMany({
  //   where: {
  //     AND: [
  //       {
  //         userReviews: {
  //           some: {},
  //         },
  //       },
  //       {
  //         favoriteMovies: {
  //           some: {},
  //         },
  //       },
  //     ],
  //   },
  // });
  console.log('🚀 ~ main ~ users:', users);
  // ----------------------- END OF Q-2 -----------------------

  // Q-3: Find reviews with ratings between `4` and `7` stars
  const ratedMovies = await prisma.movie.findMany({
    where: {
      rating: {
        gt: 4,
        lt: 7,
      },
    },
  });
  console.log('🚀 ~ main ~ ratedMovies:', ratedMovies);
  // ----------------------- END OF Q-3 -----------------------

  // Q-4: Get the 5 most recently released movies
  const recentMovies = await prisma.movie.findMany({
    orderBy: {
      releaseYear: 'desc',
    },
    take: 5,
  });
  console.log('🚀 ~ main ~ recentMovies:', recentMovies);
  // ----------------------- END OF Q-4 -----------------------

  // Q-5: Get the top rated movies greater than 8 using aggregation
  const highestAvgRatedMovies = await prisma.movie.groupBy({
    by: ['id', 'name', 'director', 'genre', 'releaseYear'],
    _avg: {
      rating: true,
    },
    orderBy: {
      _avg: {
        rating: 'desc',
      },
    },
    // take: 3,
    having: {
      rating: {
        _avg: {
          gte: 8,
        },
      },
    },
  });
  console.log('🚀 ~ main ~ highestAvgRatedMovies:', highestAvgRatedMovies);
  // ----------------------- END OF Q-5 -----------------------
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
