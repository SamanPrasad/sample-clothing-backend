import { Request, Response } from "express";
import { Slider, SliderType } from "../model/sliders";
import { getResponseObject } from "../utils/requestPayload";

export const getSliderImages = async (req: Request, res: Response) => {
  const type = req.query.type;
  const sliderImages = await Slider.find<SliderType>(type ? { type } : {});
  res.status(200).json({
    status: true,
    message: "success",
    data: sliderImages,
  });
};

export const addSliderImage = async (req: Request, res: Response) => {
  const payload = getResponseObject(req.body, ["slug", "type"]);
  const sliderImage = new Slider(payload);
  const response = await sliderImage.save();
  res.status(201).json({
    status: true,
    message: "success",
    data: response,
  });
};
