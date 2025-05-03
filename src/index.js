import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import {app} from './app.js'

// const app = express(); //i import it mistakly gave an error =>  Identifier 'app' has already been declared

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on Port: ${process.env.PORT || 8000}`);
    });

    app.on("error", (error) => {
      console.error("Server Error:", error);
      throw error;
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!!!", err);
  });

// Not recomennded below code main code is in db/index.js

/*
import express from "express";

const app = express();

(async () => {
  // This is an IIFE (Immediately Invoked Function Expression) to allow async/await at the top level
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
    }); 

    app.listen(process.env.PORT, ()=>{
        console.log(`App is running on port ${process.env.PORT}`);
        
    }); // Start the server after connecting to MongoDB

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error to ensure the process exits with a non-zero status
  }
})(); // Call the IIFE immediately

*/
