import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const saltRounds = 10; // Adjust this for your needs

async function main() {
  const hashedPassword = await bcrypt.hash('admin', saltRounds);

  const adminUser = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@dev.com',
      password: hashedPassword,
      role: 'admin', // Set the role as admin
    },
  });

}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
