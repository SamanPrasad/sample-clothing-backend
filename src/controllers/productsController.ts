import { Request, Response } from "express";
import { Product, ProductType } from "../model/product";
import { ProductRequest } from "../types/product";
import { getResponseObject } from "../utils/requestPayload";
import { saveVariant } from "../utils/variant";
import "../model/variant";
import mongoose from "mongoose";
import { Variant, VariantType } from "../model/variant";
import { SIZES_ORDER } from "../constants/index";

export const getAllProducts = async (req: Request, res: Response) => {
  const { page = "1", perPage = "10" } = req.query;
  const limit = parseInt(perPage as string, 10);
  const skip = (parseInt(page as string, 10) - 1) * limit;

  const total = await Product.countDocuments({ isPublished: true });
  const numberOfPages = Math.ceil(total / limit);

  const products = await Product.find({ isPublished: true })
    .skip(skip)
    .limit(limit)
    .populate("variants");

  const optimizedProducts = products.map((product: ProductType) => {
    if (product.variants?.length > 0) {
      const colorsSet = new Set(product.colors || []);
      const sizesSet = new Set(product.sizes || []);

      //push variant colors and sizes to main color array
      (product.variants as VariantType[]).forEach((variant: VariantType) => {
        colorsSet.add(variant.color);
        sizesSet.add(variant.size);
      });

      product.colors = Array.from(colorsSet);
      product.sizes = Array.from(sizesSet);

      //sort variants
      (product.variants as VariantType[]).sort(
        (a: VariantType, b: VariantType) => {
          return (
            SIZES_ORDER.indexOf(a.size.toLowerCase()) -
            SIZES_ORDER.indexOf(b.size.toLowerCase())
          );
        }
      );
    }
    return product;
  });

  res.json({
    status: true,
    message: "success",
    data: {
      products: optimizedProducts,
      numberOfPages,
      total,
    },
  });
};

export const createProduct = async (
  req: Request<{}, {}, ProductRequest>,
  res: Response
) => {
  const session = await mongoose.startSession();

  try {
    const response = await session.withTransaction(async () => {
      const productResponse = getResponseObject<ProductType>(req.body, [
        "title",
        "slug",
        "description",
        "price",
        "colors",
        "sizes",
        "tags",
      ]);

      const product = new Product(productResponse);
      product.isPublished = false;

      //Add variants if provided
      if (req.body.variants && req.body.variants.length > 0) {
        const variants = req.body.variants.map((variant) => ({
          ...variant,
          productId: product._id,
        }));

        const response = await saveVariant(variants);
        Array.isArray(response)
          ? (product.variants = response.map((variant) => variant._id))
          : product.variants.push(response._id);

        product.isPublished = true;
      }

      return await product.save({ session });
    });
    res.status(200).json({ data: response, message: "Product added" });

    console.log("Transaction committed successfully!");
  } catch (error) {
    console.log(error);
    res.status(401).send("Product Not added!");
  } finally {
    session.endSession();
  }
};
