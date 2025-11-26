import express from "express";
import { postUser, getAllUsers, getUserById, putUserById, deleteUserById, userPasswordById } from "../controllers/users.controller.js";
import { auth } from "../middleware/auth.js";
import { uploadProfile } from "../middleware/images.multer.js";
export const userRouter = express.Router();

// Route POST
userRouter.post("/", uploadProfile.single("profile"), postUser);

// Route GET
userRouter.get("/", auth("admin"), getAllUsers);
userRouter.get("/:id",  getUserById);

// Route PUT
userRouter.put("/:id", uploadProfile.single("profile"), putUserById);
userRouter.put("/password/:id/", userPasswordById);

// Route DELETE
userRouter.delete("/:id", deleteUserById);