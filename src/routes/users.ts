import { Router } from "express";
const router = Router();

router.get("/details", (req, res) => {
  res.status(300).send("jerome");
});

export default router;
