import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect("");
  } catch (err) {
    console.log("Connect DB error", err);
  }
};

export default connectDB;
