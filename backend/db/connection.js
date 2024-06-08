import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MonngoDB");
  } catch (error) {
    console.log("Error connection to DB", error.message);
  }
};

export default connectToDB;