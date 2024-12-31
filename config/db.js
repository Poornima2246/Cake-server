// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// export const connectDB = async () => {
//   try {
//     const url = process.env.MONGODB_URI || "mongodb+srv://cake:cake@cake.h9fta.mongodb.net/"; // Use .env variable or fallback
//     await mongoose.connect(url, {
//       useNewUrlParser: true, 
//       useUnifiedTopology: true, 
//     });
//     console.log("MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("MongoDB Connection Error:", error.message);
//     process.exit(1); // Exit process with failure
//   }
// };


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI; // Fetch from environment variables
    if (!url) {
      throw new Error("MONGODB_URI is not defined in the environment variables");
    }

    await mongoose.connect(url); // No additional options needed in Mongoose 6+
    console.log(`MongoDB connected successfully on ${url}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};
