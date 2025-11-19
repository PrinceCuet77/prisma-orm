import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Clear existing data (optional)
  await prisma.review.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data...');

  // Create Users
  const users = await prisma.user.createMany({
    data: [
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
    ],
  });

  console.log('👥 Created users:', users.count);

  // Get created users for relationships
  const createdUsers = await prisma.user.findMany();

  // Create Movies
  const movies = await prisma.movie.createMany({
    data: [
      {
        name: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        rating: 9.3,
        genre: 'Drama',
        releaseYear: new Date('1994-09-23'),
      },
      {
        name: 'The Dark Knight',
        director: 'Christopher Nolan',
        rating: 9.0,
        genre: 'Action',
        releaseYear: new Date('2008-07-18'),
      },
      {
        name: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        rating: 8.9,
        genre: 'Crime',
        releaseYear: new Date('1994-10-14'),
      },
      {
        name: 'Forrest Gump',
        director: 'Robert Zemeckis',
        rating: 8.8,
        genre: 'Drama',
        releaseYear: new Date('1994-07-06'),
      },
      {
        name: 'Inception',
        director: 'Christopher Nolan',
        rating: 8.7,
        genre: 'Sci-Fi',
        releaseYear: new Date('2010-07-16'),
      },
      {
        name: 'The Matrix',
        director: 'The Wachowskis',
        rating: 8.7,
        genre: 'Sci-Fi',
        releaseYear: new Date('1999-03-31'),
      },
      {
        name: 'Goodfellas',
        director: 'Martin Scorsese',
        rating: 8.7,
        genre: 'Crime',
        releaseYear: new Date('1990-09-19'),
      },
      {
        name: 'The Lord of the Rings: The Fellowship of the Ring',
        director: 'Peter Jackson',
        rating: 8.8,
        genre: 'Fantasy',
        releaseYear: new Date('2001-12-19'),
      },
    ],
  });

  console.log('🎬 Created movies:', movies.count);

  // Get created movies for relationships
  const createdMovies = await prisma.movie.findMany();

  // Create Reviews with realistic content
  const reviewsData = [
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

  // Filter out any reviews with undefined movieId or userId
  const validReviewsData = reviewsData.filter(
    (review): review is typeof review & { movieId: string; userId: string } =>
      Boolean(review.movieId && review.userId)
  );
  console.log('🚀 ~ main ~ validReviewsData:', validReviewsData);

  const reviews = await prisma.review.createMany({
    data: validReviewsData,
  });

  console.log('⭐ Created reviews:', reviews.count);

  // Create some favorite movie relationships
  const favoriteRelations = [
    {
      userId: createdUsers[0]?.id,
      movieIds: [
        createdMovies.find((m: any) => m.name === 'The Shawshank Redemption')
          ?.id,
        createdMovies.find((m: any) => m.name === 'Pulp Fiction')?.id,
      ].filter((id): id is string => Boolean(id)),
    },
    {
      userId: createdUsers[1]?.id,
      movieIds: [
        createdMovies.find((m: any) => m.name === 'The Dark Knight')?.id,
        createdMovies.find((m: any) => m.name === 'Inception')?.id,
        createdMovies.find((m: any) => m.name === 'Goodfellas')?.id,
      ].filter((id): id is string => Boolean(id)),
    },
    {
      userId: createdUsers[2]?.id,
      movieIds: [
        createdMovies.find((m: any) => m.name === 'Pulp Fiction')?.id,
        createdMovies.find((m: any) => m.name.includes('Fellowship'))?.id,
      ].filter((id): id is string => Boolean(id)),
    },
  ];

  // Update users with favorite movies
  for (const relation of favoriteRelations) {
    if (relation.userId) {
      await prisma.user.update({
        where: { id: relation.userId },
        data: {
          favoriteMovies: {
            connect: relation.movieIds.map((id) => ({ id })),
          },
        },
      });
    }
  }

  console.log('❤️  Created favorite movie relationships');

  // Display summary
  const totalUsers = await prisma.user.count();
  const totalMovies = await prisma.movie.count();
  const totalReviews = await prisma.review.count();

  console.log('\n🎉 Seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   Users: ${totalUsers}`);
  console.log(`   Movies: ${totalMovies}`);
  console.log(`   Reviews: ${totalReviews}`);
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
