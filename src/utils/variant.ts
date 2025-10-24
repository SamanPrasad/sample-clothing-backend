import { Variant } from "../model/variant";
import { VariantRequest } from "../types/variant";

export const saveVariant = async (data: VariantRequest | VariantRequest[]) => {
  try {
    if (Array.isArray(data)) {
      return await Variant.insertMany(data);
    }
    return await Variant.create(data);
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't Save Variant");
  }
};
