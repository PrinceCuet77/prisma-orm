import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Clear existing data
  await prisma.review.deleteMany();

  console.log('🗑️  Cleared existing data...');

  const createdUsers = await prisma.user.findMany();
  const createdMovies = await prisma.movie.findMany();

  const reviewData = [
    {
      text: 'Absolutely masterful storytelling! The Shawshank Redemption is a testament to hope and friendship. Morgan Freeman and Tim Robbins deliver phenomenal performances.',
      userId: createdUsers[0]?.id,
      movieId: createdMovies.find(
        (m: any) => m.name === 'The Shawshank Redemption'
      )?.id,
    },
    {
      text: "Christopher Nolan has outdone himself with The Dark Knight. Heath Ledger's Joker is haunting and brilliant. The action sequences are perfectly choreographed.",
      userId: createdUsers[1]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'The Dark Knight')?.id,
    },
    {
      text: "Pulp Fiction is a non-linear masterpiece. Tarantino's dialogue is sharp, witty, and memorable. Every scene is iconic in its own right.",
      userId: createdUsers[2]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'Pulp Fiction')?.id,
    },
    {
      text: 'Forrest Gump is both heartwarming and heartbreaking. Tom Hanks brings such authenticity to the character. A beautiful journey through American history.',
      userId: createdUsers[3]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'Forrest Gump')?.id,
    },
    {
      text: 'Inception blew my mind! The concept of dreams within dreams is executed flawlessly. The practical effects are stunning and the plot keeps you guessing.',
      userId: createdUsers[4]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'Inception')?.id,
    },
    {
      text: 'The Matrix revolutionized cinema. The philosophical themes combined with groundbreaking action sequences make it a timeless classic.',
      userId: createdUsers[0]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'The Matrix')?.id,
    },
    {
      text: 'Goodfellas is Scorsese at his finest. The narration, the violence, the humor - everything works perfectly. Ray Liotta is phenomenal.',
      userId: createdUsers[1]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'Goodfellas')?.id,
    },
    {
      text: 'Peter Jackson brought Middle-earth to life beautifully. The Fellowship sets up the epic trilogy perfectly with stunning visuals and great character development.',
      userId: createdUsers[2]?.id,
      movieId: createdMovies.find((m: any) => m.name.includes('Fellowship'))
        ?.id,
    },
    // Additional reviews from different users for the same movies
    {
      text: "The Dark Knight is more than a superhero movie - it's a crime thriller that explores morality and chaos. Nolan's direction is impeccable.",
      userId: createdUsers[3]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'The Dark Knight')?.id,
    },
    {
      text: 'Inception is a puzzle wrapped in an enigma. Multiple viewings reveal new layers. The ending still gives me chills every time!',
      userId: createdUsers[2]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'Inception')?.id,
    },
    {
      text: "The Shawshank Redemption grows on you with each viewing. It's about resilience, hope, and the power of human connection. Simply beautiful.",
      userId: createdUsers[4]?.id,
      movieId: createdMovies.find(
        (m: any) => m.name === 'The Shawshank Redemption'
      )?.id,
    },
    {
      text: 'Pulp Fiction changed cinema forever. The non-linear narrative, the pop culture references, the violence - all perfectly balanced by Tarantino.',
      userId: createdUsers[0]?.id,
      movieId: createdMovies.find((m: any) => m.name === 'Pulp Fiction')?.id,
    },
  ];

  // Filter out reviews with missing user or movie data and create properly typed data
  const validReviewData = reviewData
    .filter((review) => review.userId && review.movieId)
    .map((review) => ({
      text: review.text,
      userId: review.userId!,
      movieId: review.movieId!,
    }));

  // Create Review
  const reviews = await prisma.review.createMany({
    data: validReviewData,
  });

  console.log('⭐ Created reviews:', reviews.count);

  // Step-01: Get reviews (without relations - only stored in the `review` table)
  // const createdReviews = await prisma.review.findMany();

  // Step-02: Get reviews (with relations - all fields)
  // const createdReviews = await prisma.review.findMany({
  //   include: {
  //     user: true,
  //     movie: true,
  //   },
  // });

  // Step-03: Get reviews (with selected fields in relations)
  // const createdReviews = await prisma.review.findMany({
  //   include: {
  //     user: {
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //       },
  //     },
  //     movie: {
  //       select: {
  //         name: true,
  //         director: true,
  //         rating: true,
  //         genre: true,
  //         releaseYear: true,
  //       },
  //     },
  //   },
  // });

  // Step-04: Get reviews (with selected fields in relations & review's selected fields)
  const createdReviews = await prisma.review.findMany({
    select: {
      id: true,
      text: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      movie: {
        select: {
          name: true,
          director: true,
          rating: true,
          genre: true,
          releaseYear: true,
        },
      },
    },
  });

  console.log('🚀 ~ main ~ createdReviews:', createdReviews);
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
