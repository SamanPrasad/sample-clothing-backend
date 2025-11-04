import { Router } from "express";
import { getS3url } from "../controllers/storageController";
const router = Router();

router.get("/s3url", getS3url);

export default router;
