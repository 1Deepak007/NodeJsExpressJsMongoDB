// mongodb.js
const { connectToMongo, closeMongoConnection } = require('./connection/connection');

// Function to create a new collection
async function createCollection(collectionName) {
    try {
        const db = await connectToMongo();
        const collection = await db.createCollection(collectionName);
        console.log(`Collection ${collectionName} created.`);
        return collection;
    } catch (error) {
        console.error(`Error creating collection '${collectionName}':`, error);
        throw error;
    }
}

// Function to get a collection
async function getCollection(collectionName) {
    try {
        const db = await connectToMongo();
        const collection = db.collection(collectionName);
        if (collection) {
            console.log(`Collection '${collectionName}' found.`);
        } else {
            console.log("Collection not found.");
        }
        return collection;
    } catch (error) {
        console.error(`Error fetching collection '${collectionName}':`, error);
        throw error;
    }
}

// Function to fetch all documents from a collection
async function getAllDataOfCollection(collectionName) {
    try {
        const collection = await getCollection(collectionName);
        const data = await collection.find({}).toArray();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error fetching data from collection '${collectionName}':`, error);
        throw error;
    }
}

// Function to find a document by a field and value
async function findDataInCollection(collectionName, fieldName, value) {
    try {
        const collection = await getCollection(collectionName);
        const result = await collection.findOne({ [fieldName]: value });
        console.log(result);
        return result;
    } catch (error) {
        console.error(`Error finding data in '${collectionName}':`, error);
        throw error;
    }
}

// Function to insert a single document into a collection
async function insertSingleDataInCollection(collectionName, data) {
    try {
        const collection = await getCollection(collectionName);
        const result = await collection.insertOne(data);
        console.log(`Inserted document successfully with ID: ${result.insertedId}`);
        return result.insertedId;
    } catch (error) {
        console.error(`Error inserting data into '${collectionName}':`, error);
        throw error;
    }
}

// Function to insert multiple documents into a collection
async function insertMultipleDataInCollection(collectionName, dataArray) {
    try {
        const collection = await getCollection(collectionName);
        const result = await collection.insertMany(dataArray);
        console.log(`Inserted documents successfully with IDs: ${Object.values(result.insertedIds)}`);
        return result.insertedIds;
    } catch (error) {
        console.error(`Error inserting multiple documents into '${collectionName}':`, error);
        throw error;
    }
}

// Function to update a document in a collection
async function updateDataInCollection(collectionName, filter, update) {
    try {
        const collection = await getCollection(collectionName);
        const result = await collection.updateOne(filter, { $set: update });
        console.log(`Updated ${result.modifiedCount} document(s).`);
        return result.modifiedCount;
    } catch (error) {
        console.error(`Error updating document in '${collectionName}':`, error);
        throw error;
    }
}

// Function to delete a document from a collection
async function deleteDataFromCollection(collectionName, filter) {
    try {
        const collection = await getCollection(collectionName);
        const result = await collection.deleteOne(filter);
        console.log(`Deleted ${result.deletedCount} document(s).`);
        return result.deletedCount;
    } catch (error) {
        console.error(`Error deleting document from '${collectionName}':`, error);
        throw error;
    }
}

// Export the functions for use in other files
module.exports = {
    createCollection,
    getCollection,
    getAllDataOfCollection,
    findDataInCollection,
    insertSingleDataInCollection,
    insertMultipleDataInCollection,
    updateDataInCollection,
    deleteDataFromCollection
};



// getCollection('products');

// getAllDataOfCollection('products');

// findDataInCollection('products',{'name':'m 40'})

// insertSingleDataInCollection(
//     'products', { name: 'Samsung Galaxy S21 Ultra', price: 69999, brand:'samsung',
//                   quantity: 100, category: 'Mobile Phones'
//     }
// );

// insertMultipleDataInCollection(
//     'products',
//     [
//         {   name: 'iPhone 14 Pro Max', price: 129999, 
//             brand: 'apple', quantity: 150, category: 'Mobile Phones'
//         },
//         {
//             name: 'Xiaomi Mi 11', price: 59999, 
//             brand: 'xiaomi', quantity: 200, category: 'Mobile Phones'
//         }
//     ]
// )

// updateDataInCollection('products', {name:'m 50'}, {name:'m 40', price:3400});
// deleteDataFromCollection('products', {name:'m 40'});
// createCollection('Students');

