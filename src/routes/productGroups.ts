import { Router } from "express";
import {
  createProductGroup,
  getAllProductsGroups,
} from "../controllers/productGroupsController";
const router = Router();

router.get("/", getAllProductsGroups);
router.post("/", createProductGroup);

export default router;
