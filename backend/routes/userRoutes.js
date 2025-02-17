import express from "express";
import { getUsers } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/getAllUsers", protectRoute, getUsers);

export default router;
