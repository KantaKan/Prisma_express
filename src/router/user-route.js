import express from "express";
import db from "../prisma-client.js";
import {
  getAllUsers,
  getUserById,
  register,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", register);

export default router;
