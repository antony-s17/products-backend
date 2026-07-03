import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { DATABASE_URL, MONGO_DB_URI } from "../misc/constants.js";
import mongoose from "mongoose";

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const prisma = new PrismaClient( { adapter });

const mongoDB = async() => {
    await mongoose.connect(MONGO_DB_URI);
    console.log("Connected to MongoDB");
}

export { prisma, mongoDB };
