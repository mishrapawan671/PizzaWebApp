import express, { Router } from "express";
import { UploadImg } from "../Controllers/UploadController.js";
const router = express.Router();
router.post("/uploadImage",UploadImg );

export default router