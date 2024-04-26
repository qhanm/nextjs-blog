import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.DB_CONNECTION}`);
  } catch (err) {
    console.log("Connect DB error", err);
  }
};

export default connectDB;
