import express from 'express';
import {verifyToken} from '../middlewares/Auth.js'
import { create, deletecomment } from '../controllers/comment.js';
const router = express.Router();

router.post("/create",verifyToken,create);
router.delete("/delete/:id",verifyToken,deletecomment);

export default router;
