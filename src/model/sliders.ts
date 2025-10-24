import mongoose, { Document, Schema } from "mongoose";

export interface SliderType extends Document {
  slug: string;
  type: "potrait" | "landscape";
}

const SliderSchema = new Schema<SliderType>({
  slug: { type: String, required: true },
  type: { type: String, required: true, enum: ["potrait", "landscape"] },
});

export const Slider =
  mongoose.models.Slider || mongoose.model("Slider", SliderSchema);
