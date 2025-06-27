import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/Auth.js';
import { deleteuser, getalldata,getallusers } from '../controllers/Dashboard.js';
const router = express.Router();

router.get("/",verifyToken,isAdmin,getalldata);
router.get("/users",verifyToken,isAdmin,getallusers);
router.delete("/user/:id",verifyToken,isAdmin,deleteuser);

export default router;
