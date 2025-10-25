import app from "./src/app";
import { connectToDatabase } from "./src/db/connection";

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
    return;
  }
  // app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
};

start();
