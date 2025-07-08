
import express from "express";
import { register, login } from "../controllers/auth.contollers.js";
import { getMe, updateMe } from "../controllers/auth.contollers.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

router.post("/register", register);
router.post("/login", login);

router.get("/me", verifyToken, getMe);
router.put("/update", verifyToken, updateMe);

export default router;
