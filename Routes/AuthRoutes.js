import express from "express";
import { Login, Logout, SignUp,GetProfile,UpdateProfile,UserDetail } from "../Controllers/AuthController.js";
const router = express.Router();
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/signup", SignUp);
router.post("/getprofile",GetProfile );
router.post("/updateProfile", UpdateProfile);
router.post("/UserDetail", UserDetail);

export default router;
