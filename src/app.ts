import express from "express";
import userRouter from "./routes/users";
import variantRouter from "./routes/variants";
import sliderImages from "./routes/slider";
import productsRouter from "./routes/products";
import productGroupsRouter from "./routes/productGroups";
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
app.get("/", (req, res) => res.send("test"));
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/variants", variantRouter);
app.use("/sliders", sliderImages);
app.use("/product-groups", productGroupsRouter);

export default app;
