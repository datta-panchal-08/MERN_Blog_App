import express from 'express';
import { login, logout, signup } from '../controllers/Auth.js';
import upload from '../middlewares/multer.js';
const router = express.Router();


router.post("/login",login);
router.post('/signup',upload.single('profile'),signup);
router.post('/logout',logout);

export default router;
