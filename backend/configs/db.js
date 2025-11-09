import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hotel-booking",
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
  }
};

export default connectDB;