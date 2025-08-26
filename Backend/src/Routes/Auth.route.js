import express, { application } from 'express';
import { protectRoute } from '../Middlewares/auth.middleware.js';

import { login,logout,signup, updateProfilePic,checkUser } from '../controllers/auth.controllers.js';

const router=express.Router();

//signin
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.put('/update-profilepic',protectRoute,updateProfilePic);
router.get('/check',protectRoute,checkUser);

export default router;