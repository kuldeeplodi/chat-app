import express from "express";
import {protectRoute} from "../Middlewares/auth.middleware.js";
import { getAllUsers, getMessages, sendMessage } from "../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
