/* 
!REST API Using Node.js, express and mongoDB
 PremjithK, Cyber Square Professional
*/
// Importing packages

//Fetching all variables from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Connecting to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.on("open", () => {
  console.log("Succesfully connected to MongoDB");
});

// Creating an instance of express and setting a port number
const app = express();

// Enabling JSON support in our server
app.use(express.json());

// Default route / Home Route
app.get("/", (req, res) => {
  res.send("Home Route".toUpperCase());
});

//! STARTING SERVER
const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(`Conencted to ${port}`);
});

//^ Creating Routes

// Importing the users route / Endpoint
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
