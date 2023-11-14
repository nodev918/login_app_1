const { MongoClient } = require("mongodb");

async function getDB(mongoURI) {
  // Create a MongoDB client
  const client = new MongoClient(mongoURI, {});

  try {
    await client.connect(); // Connect to MongoDB Atlas
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
  return client;
}

module.exports = {
  getDB,
};
