import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

export function connectDatabase() {
  prisma
    .$connect()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error connecting to database", err);
    });
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export default prisma;
