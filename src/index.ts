import express from "express";
import userRouter from "./routes/users";
import variantRouter from "./routes/variants";
import sliderImages from "./routes/slider";
import productsRouter from "./routes/products";
import productGroupsRouter from "./routes/productGroups";
import cors from "cors";
import { connectToDatabase } from "./db/connection";
const app = express();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
    return;
  }
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
};

start();

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => res.send("test"));
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/variants", variantRouter);
app.use("/sliders", sliderImages);
app.use("/product-groups", productGroupsRouter);

export default app;
