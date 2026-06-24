import { prisma } from "./lib/db";
import bcrypt from "bcryptjs";

async function main() {
  try {
    console.log("Simulating user registration...");
    const username = "testuser_" + Date.now();
    const password = "password123";
    
    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log("Creating user in Prisma...", { username, hashedPassword });
    const user = await prisma.user.create({
      data: {
        email: username,
        name: username,
        passwordHash: hashedPassword,
      }
    });
    
    console.log("Registration successful! Created User:", user);
  } catch (error) {
    console.error("Registration simulation failed with error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
