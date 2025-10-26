import express from "express";
import userRouter from "./routes/users";
import variantRouter from "./routes/variants";
import sliderImages from "./routes/slider";
import productsRouter from "./routes/products";
import productGroupsRouter from "./routes/productGroups";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const ORIGIN = process.env.ORIGIN;
if (!ORIGIN) throw new Error("No origin found!");

app.use(
  cors({
    origin: ORIGIN,
    allowedHeaders: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => res.send("Welcome to Sample Clothing..."));

app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/variants", variantRouter);
app.use("/sliders", sliderImages);
app.use("/product-groups", productGroupsRouter);

export default app;
