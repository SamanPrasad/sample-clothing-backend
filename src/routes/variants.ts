import { Request, Router } from "express";
import { Variant, VariantType } from "../model/variant";
import { VariantRequest } from "../types/variant";
import { getResponseObject } from "../utils/requestPayload";
import { Product, ProductType } from "../model/product";
import mongoose from "mongoose";
const router = Router();

router.get("/", async (req, res) => {
  const variants = await Variant.find();
  res.json({
    status: true,
    message: "success",
    data: variants,
  });
});

// router.post("/by-ids", (req, res)=>{
//   const variants = Variant.find({id:req.body})
// })

router.post("/", async (req: Request<{}, {}, VariantRequest>, res) => {
  try {
    const session = await mongoose.startSession();

    const response = await session.withTransaction(async () => {
      const responseObject = getResponseObject<VariantType>(req.body, [
        "productId",
        "color",
        "size",
        "price",
        "stock",
        "images",
      ]);

      const product = await Product.findById<ProductType>(
        responseObject.productId
      );

      if (!product) {
        res.status(403).send("Product Not Found!");
        return;
      }

      const variant = new Variant(responseObject);

      product.variants.push(variant._id);
      await variant.save({ session });
      await product.save({ session });
      return variant;
    });

    res.status(200).json({ data: response, message: "Variant added" });
  } catch (error) {
    res.status(403).send("Variant Not added");
  }
});

export default router;
