// scripts/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { components, categories } from '../src/data/mockData';
import ComponentModel from '../server/models/Component.js';
import CategoryModel from '../server/models/Category.js';

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("❌ MONGO_URI is not defined in your .env file");
}

const seedDatabase = async () => {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');
        console.log('📦 Using DB:', mongoose.connection.name);

        // Clear existing data
        await ComponentModel.deleteMany();
        await CategoryModel.deleteMany();

        // Insert data
        console.log("➡️ Inserting categories:", categories.length);
        console.log("➡️ Inserting components:", components.length);
        console.log("First component example:", components[0]);

        await CategoryModel.insertMany(categories);
        await ComponentModel.insertMany(components);

        console.log('✅ Mock data successfully inserted');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seedDatabase();
