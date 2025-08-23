import express, { application } from 'express';

import { login,logout,signup } from '../controllers/auth.controllers.js';

const router=express.Router();

//signin
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

export default router;