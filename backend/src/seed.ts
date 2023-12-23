// import { PrismaClient } from '@prisma/client';
// // import { add } from 'date-fns';
// import {user} from '@prisma/client';

// const prisma = new PrismaClient();
// console.log("----------------------------------->");

// // A `main` function so that we can use async/await
// async function main() {
//   try {
//     // let khaoula: user;
//     const grace = await prisma.user.create({
//       data: {
//         FirstName: 'khaoula',
//         LastName: 'adjane',
//         nickname: 'khaoula_nickname',
//         login:'kadjane',
//         // Remove the fields that are not present in the new schema
//       },
//     });

//     console.log('User created:', grace);
//   } catch (error) {
//     console.error('Error creating user:', error);
//   } finally {
//     // Disconnect Prisma Client
//     await prisma.$disconnect();
//   }
// }

// main().catch((e: Error) => {
//   console.error(e);
//   process.exit(1);
// });
