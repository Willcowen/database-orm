const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const date = new Date(Date.parse("2022-10-01"));
  const createCustomerWithContact = await prisma.customer.create({
    data: {
      name: "Alice",
      contact: {
        create: {
          phone: "123",
          email: "Alice@prisma.io",
        },
      },
    },
  });

  const createScreenWithScreening = await prisma.screen.create({
    data: {
      number: 123,
      screening: {
        create: [
          {
            startsAt: date,
            movie: {
              create: {
                title: "TEST",
                runtimeMins: 123,
              },
            },
          },
        ],
      },
    },
  });

  console.log("Customer with Contact created:", createCustomerWithContact);
  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
