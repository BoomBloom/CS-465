// Database Seeding Script for Travlr Getaways (CS 465 Module 4)
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = process.env.MONGODB_URI || `mongodb://${host}:27017/travlr`;

// Register the Trip schema and model
require('./travlr');
const Trip = mongoose.model('trips');

const seedDB = async () => {
    try {
        console.log(`[Seed] Connecting to database at ${dbURI}...`);
        await mongoose.connect(dbURI);
        console.log('[Seed] Database connection established successfully.');

        const dataPath = path.join(__dirname, '../../data/trips.json');
        console.log(`[Seed] Reading sample trip data from ${dataPath}...`);
        const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        console.log(`[Seed] Clearing existing records from 'trips' collection...`);
        await Trip.deleteMany({});

        console.log(`[Seed] Inserting ${trips.length} sample trip records...`);
        const result = await Trip.insertMany(trips);

        console.log(`[Seed] Successfully seeded ${result.length} trips into the 'trips' collection:`);
        result.forEach((trip, idx) => {
            console.log(`  ${idx + 1}. [${trip.code}] ${trip.name} - ${trip.resort} ($${trip.perPerson})`);
        });

        await mongoose.connection.close();
        console.log('[Seed] Database connection closed gracefully.');
        process.exit(0);
    } catch (err) {
        console.error('[Seed] Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
