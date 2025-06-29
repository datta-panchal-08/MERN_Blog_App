import express from 'express';
import { create, deleteBlog, getblogbyid, getPosts, update } from '../controllers/Blog.js';
import { isAdmin, verifyToken } from '../middlewares/Auth.js';
import upload from '../middlewares/multer.js';
const router = express.Router();

router.post("/create",verifyToken,isAdmin,upload.single("image"),create);
router.delete("/delete/:id",verifyToken,isAdmin,deleteBlog);
router.get("/blogs",getPosts);
router.patch('/update/:id',verifyToken,isAdmin,upload.single("postimage"),update);
router.get("/:id",getblogbyid);

export default router;
