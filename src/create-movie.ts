import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const movieData = [
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
];

const main = async () => {
  // Clear existing data
  await prisma.movie.deleteMany();

  console.log('🗑️  Cleared existing data...');

  // Create Movie
  const movies = await prisma.movie.createMany({
    data: movieData,
  });

  console.log('🎬 Created movies:', movies.count);

  // Get created movies
  const createdMovies = await prisma.movie.findMany();

  console.log("🚀 ~ main ~ createdMovies:", createdMovies)
};

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
