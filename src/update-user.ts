import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const createdUsers = await prisma.user.findMany();
  const createdMovies = await prisma.movie.findMany();

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
  // for (const relation of favoriteRelations) {
  //   if (relation.userId) {
  //     await prisma.user.update({
  //       where: { id: relation.userId },
  //       data: {
  //         favoriteMovies: {
  //           connect: relation.movieIds.map((id) => ({ id })),
  //         },
  //       },
  //     });
  //   }
  // }

  console.log('❤️  Created favorite movie relationships');

  // Display summary
  const updatedUsers = await prisma.user.findMany({
    include: {
      favoriteMovies: true,
      userReviews: true,
    },
  });

  console.log('\n🎉 Update completed!');
  console.log(`📊 Summary:`);
  console.log(`   Total Users: ${updatedUsers.length}`);

  console.log('\n👥 Users with their favorite movies: ', updatedUsers);
  updatedUsers.forEach((user, index) => {
    console.log(`\n${index + 1}. ${user.name} (${user.email})`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Favorite Movies (${user.favoriteMovies.length}):`);
    if (user.favoriteMovies.length > 0) {
      user.favoriteMovies.forEach((movie, movieIndex) => {
        console.log(
          `     ${movieIndex + 1}. ${movie.name} (${movie.director})`
        );
      });
    } else {
      console.log(`     No favorite movies yet`);
    }
    if (user.userReviews.length > 0) {
      console.log(`   Reviews (${user.userReviews.length}):`);
      user.userReviews.forEach((review, reviewIndex) => {
        console.log(`     ${reviewIndex + 1}. ${review.text}`);
      });
    } else {
      console.log(`   No reviews yet`);
    }
  });
};

main()
  .catch((e) => {
    console.error('❌ Error during update operation:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
