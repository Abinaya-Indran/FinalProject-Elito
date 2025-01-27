import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Create a global variable to store the Mongoose connection for reusability
declare global {
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected!");
    return mongoose;
  }

  if (!global.mongooseConnection) {
    global.mongooseConnection = mongoose.connect(MONGO_URI as string, {
      dbName: "NextJSAPI", // Replace with your database name
      bufferCommands: true,
    });
  }

  try {
    await global.mongooseConnection;
    console.log("MongoDB connected successfully!");
    return mongoose;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Ensure errors propagate to the caller
  }
}
