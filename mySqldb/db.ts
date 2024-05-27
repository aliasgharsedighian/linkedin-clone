import mongoose from "mongoose";

const connectionString = ``;

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectMySql = async () => {
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

export default connectMySql;
