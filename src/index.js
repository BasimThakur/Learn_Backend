// require('dotenv').config();

import dotenv from "dotenv"
import connectDB from "./db/index.js";
 



dotenv.config({
  path: './env'
});

connectDB(); // Connect to MongoDB



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
