import express from "express";
import { 
  CreatPost, 
  GetAllPosts, 
  GetPost, 
  DeletePost, 
  ReactOnPost, 
  addComment, 
  SearchPosts, 
  filterPosts 
} from "../controllers/Post.controllers.js";
import  protectRoute  from "../middleware/authMiddleware.js"; // Protect routes requiring authentication

const router = express.Router();

router.post("/posts", protectRoute, CreatPost);
router.get("/posts", GetAllPosts);
router.get("/posts/:id", GetPost);
router.delete("/posts/:id", protectRoute, DeletePost);
router.post("/posts/:id/react", protectRoute, ReactOnPost);
router.post("/posts/:id/comment", protectRoute, addComment);
router.get("/posts/search", SearchPosts);
router.get("/posts/filter", filterPosts);

export default router;
