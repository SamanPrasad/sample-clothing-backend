import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("DB String not found!");

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using the exisiting connection...");
    return;
  }
  console.log("Connecting to Database...");
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
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

    isConnected = conn.connections[0].readyState === 1;
    console.log("Database Connected!");
  } catch (error) {
    throw new Error("db connection error");
  }
};
