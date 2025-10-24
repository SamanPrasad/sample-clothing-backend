import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("DB String not found!");

export const connectToDatabase = async () => {
  console.log("Connecting to Database...");
  try {
    await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      w: "majority",
    });
    mongoose.set("toJSON", {
      virtuals: false,
      versionKey: false,
      transform(_, ret: Record<string, any>) {
        ret.id = ret._id;
        delete ret._id;
      },
    });
    console.log("Database Connected!");
  } catch (error) {
    throw new Error("db connection error");
  }
};
