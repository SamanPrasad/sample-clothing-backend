import mongoose, {
  Document,
  InferSchemaType,
  Schema,
  SchemaType,
  Types,
} from "mongoose";
import { WithRequired } from "../types/schemas";

const productsGroupSchema = new Schema({
  title: String,
  slug: String,
  image: String,
  groupType: {
    type: String,
    required: true,
    enum: ["categories", "collections"],
  },
  productIds: { type: [Schema.Types.ObjectId], ref: "Product", required: true },
});

type TypeWithoutRequired = InferSchemaType<typeof productsGroupSchema>;
export type ProductSGroupType = WithRequired<
  TypeWithoutRequired,
  keyof TypeWithoutRequired
>;

export const ProductGroup =
  mongoose.models.ProductGroup ||
  mongoose.model("ProductGroup", productsGroupSchema);
