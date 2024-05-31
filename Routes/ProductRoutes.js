import express from "express";
import { addproducts,updateproducts,deleteproducts} from "../Controllers/ProductsController.js";
const router = express.Router();
router.post("/addproducts", addproducts);
router.post("/update", updateproducts);
router.post("/delete", deleteproducts);

export default router;