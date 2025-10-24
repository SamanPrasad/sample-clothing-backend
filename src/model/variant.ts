import mongoose, { InferSchemaType, Schema, SchemaType, Types } from "mongoose";

export type VariantType = {
  productId: Types.ObjectId;
  color: string;
  size: string;
  price: number;
  stock: number;
  images: string[];
};

const VariantSchema = new Schema<VariantType>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
    collection: "variants",
  }
);

export const Variant =
  mongoose.models.Variant || mongoose.model("Variant", VariantSchema);
