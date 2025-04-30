import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connenctionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected!!! DB Host: ${connenctionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connection FAILED!", error);
        process.exit(1); // Exit the process with a failure code
    }
}

export default connectDB;