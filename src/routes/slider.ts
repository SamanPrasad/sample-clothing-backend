import { Router } from "express";
import {
  addSliderImage,
  getSliderImages,
} from "../controllers/sliderController";
const router = Router();

router.get("/", getSliderImages);
router.post("/", addSliderImage);

export default router;
