import mongoose from "mongoose";

const connectionString = `mongodb://localhost:27017/linkedin-clone`;

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("_____ Already connected to MongoDB _____");
    return;
  }

  try {
    console.log("____ connecting to MongoDb ____");
    await mongoose.connect(connectionString);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectDB;
