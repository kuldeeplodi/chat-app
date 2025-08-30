import express from "express";
import {protectRoute} from "../Middlewares/auth.middleware.js";
import { getAllUsers, getMessage, sendMessage } from "../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getMessage);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
