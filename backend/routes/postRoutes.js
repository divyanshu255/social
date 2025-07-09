import express from "express";
import {
  createPost,
  getAllPosts,
  likePost,
  commentOnPost,
  getUserPosts,
} from "../controllers/post.controller.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// upload.single("image"), 
router.post("/", verifyToken,createPost);
router.get("/feed", verifyToken,  getAllPosts);
router.post("/:id/like", verifyToken,  likePost);
router.post("/:id/comment", verifyToken,  commentOnPost);
router.get("/user/:userId", verifyToken,  getUserPosts);

export default router;
