import express from 'express';
import {verifyToken} from '../middlewares/Auth.js'
import { create } from '../controllers/comment.js';
const router = express.Router();

router.post("/create",verifyToken,create);


export default router;
