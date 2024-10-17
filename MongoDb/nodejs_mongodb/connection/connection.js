const { MongoClient } = require('mongodb');

// MongoDB configuration
const mongodb_url = 'mongodb://localhost:27017';
const databaseName = 'e-comm';
let client;
let db;

// Function to connect to MongoDB and reuse the connection
async function connectToMongo() {
    if (!client) {
        try {
            client = new MongoClient(mongodb_url);
            await client.connect();
            console.log('Connected to MongoDB');
            db = client.db(databaseName);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
    return db;
}

// Function to close MongoDB connection
async function closeMongoConnection() {
    if (client) {
        await client.close();
        client = null;
        console.log('MongoDB connection closed.');
    }
}

module.exports = { connectToMongo, closeMongoConnection };
