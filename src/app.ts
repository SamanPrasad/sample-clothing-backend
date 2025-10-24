import express from "express";
import userRouter from "./routes/users.ts";
import variantRouter from "./routes/variants.ts";
import sliderImages from "./routes/slider.ts";
import productsRouter from "./routes/products.ts";
import productGroupsRouter from "./routes/productGroups.ts";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/variants", variantRouter);
app.use("/sliders", sliderImages);
app.use("/product-groups", productGroupsRouter);

export default app;
