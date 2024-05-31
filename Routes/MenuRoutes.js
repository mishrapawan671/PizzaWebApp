import express from "express";
import { getProduct } from "../Controllers/ProductsController.js";
const router = express.Router();
router.get("/", getProduct);

export default router;
