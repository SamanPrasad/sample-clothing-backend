import app from "./app.ts";
import { connectToDatabase } from "./db/connection.ts";

const start = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
    return;
  }
  app.listen(3000, () => console.log("Server is listening on port 3000..."));
};

start();
