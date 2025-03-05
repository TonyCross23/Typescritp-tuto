import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be set");
}

console.log("Connecting to MongoDB");

mongoose.connect(process.env.MONGO_URI);
