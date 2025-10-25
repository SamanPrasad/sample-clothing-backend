import app from "./app";
import { connectToDatabase } from "./db/connection";

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
    return;
  }
};

start();
