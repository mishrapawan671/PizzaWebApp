import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrder,
  getOrderbyPage,
  getOrderbyId,
  changeStatus
} from "../Controllers/OrderController.js";
const router = express.Router();
router.post("/addOrder", addOrder);
router.get("/cancel/:id", deleteOrder);
router.post("/showOrders", getAllOrder);
router.get("/getOrder/:id", getOrderbyId);
router.post("/changeStatus",changeStatus );

export default router;
