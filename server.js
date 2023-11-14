const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

let client;

/**
 *   process database
 */
(async () => {
  const { getDB } = require("./db");
  require("dotenv").config();
  const mongoURI = process.env.DSN;
  client = await getDB(mongoURI);
})();

// Middleware to parse incoming JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve your static HTML file
app.use(express.static("public"));

// Define a route to handle the form submission
app.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  // Handle the form data as needed (e.g., save it to a database)
  // For now, just log it to the console
  console.log("Received form data:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    const db = client.db("main"); // Specify your database name
    const collection = db.collection("sheepjs"); // Specify your collection name

    const user = {
      name: name,
      email: email,
      password: password,
    };

    // Insert the document into the collection
    const result = await collection.insertOne(user);
    console.log("Inserted a user:", result);
  } catch (error) {
    console.error("Error inserting user:", error);
  } finally {
    // await client.close(); // Close the connection
  }

  // Send a response to the client
  res.send("Form submitted successfully");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
