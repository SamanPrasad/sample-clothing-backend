import { VariantType } from "../model/variant";
import { VariantRequest } from "./variant";

export type ProductRequest = {
  title: string;
  slug: string;
  description: string;
  attributes: { colors: string[]; sizes: string[] };
  tags: string[];
  variants?: (Omit<VariantRequest, "productId"> & { productId?: string })[];
};
