import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country} - ${addr.pincode}`;
        },
      },
    },
  },
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
