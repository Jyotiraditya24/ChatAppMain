import express from "express";
import { sendMessage,getMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// id is params
// ? is called query
router.post(`/send/:id`, protectRoute, sendMessage);
router.get("/get/:id", protectRoute, getMessage);

export default router;
