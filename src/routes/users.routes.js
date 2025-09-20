import express from "express";
import { postUser, getAllUsers, getUserById, putUserById, deleteUserById } from "../controllers/users.controller.js";
import { auth } from "../middleware/auth.js";
export const userRouter = express.Router();

// Route POST
userRouter.post("/", postUser);

// Route GET
userRouter.get("/", auth("admin"), getAllUsers);
userRouter.get("/:id",  getUserById);

// Route PUT
userRouter.put("/:id", putUserById);

// Route DELETE
userRouter.delete("/:id", deleteUserById);