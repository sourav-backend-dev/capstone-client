import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('admin', 10);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@dev.com",
      password: hashedPassword, // Store hashed password
      role: "admin",
      adminProfile: {
        create: {
          permissions: "ALL_ACCESS",
        },
      },
    },
  });

  console.log("Admin user created:", adminUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
