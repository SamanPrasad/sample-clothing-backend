import mongoose, { Document, InferSchemaType, Schema, Types } from "mongoose";
import { ref } from "process";
import { VariantType } from "./variant";

export interface ProductType extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  colors: string[];
  sizes: string[];
  tags: string[];
  variants: Types.ObjectId[] | VariantType[];
  isPublished: boolean;
}

const productSchema = new mongoose.Schema<ProductType>(
  {
    title: String,
    slug: String,
    description: String,
    price: Number,
    colors: [String],
    sizes: [String],
    tags: [String],
    variants: {
      type: [Schema.Types.ObjectId],
      ref: "Variant",
      required: false,
    },
    isPublished: Boolean,
  },
  { timestamps: true, collection: "products" }
);

export const Product =
  mongoose.models.Product<ProductType> ||
  mongoose.model<ProductType>("Product", productSchema);
