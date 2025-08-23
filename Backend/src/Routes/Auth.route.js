import express, { application } from 'express';
import { protectRoute } from '../Middlewares/auth.middleware.js';

import { login,logout,signup, updateProfilePic } from '../controllers/auth.controllers.js';

const router=express.Router();

//signin
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.post('/update-profilepic',protectRoute,updateProfilePic);

export default router;