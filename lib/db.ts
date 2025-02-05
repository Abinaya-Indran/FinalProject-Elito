import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

let isConnected = false; // Track connection status

export async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    
    await mongoose.connect(MONGO_URI as string, {
      dbName: "NextJSAPI",
      bufferCommands: false, // Prevent query buffering issues
      serverSelectionTimeoutMS: 5000, // Fail fast if no response from MongoDB
      socketTimeoutMS: 45000, // Avoid long waits
    });

    isConnected = mongoose.connection.readyState === 1;
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
