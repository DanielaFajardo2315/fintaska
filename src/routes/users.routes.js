import express from "express";
import { postUser, getAllUsers, putUserById, deleteUserById } from "../controllers/users.controller.js";

export const userRouter = express.Router();

// Route POST
userRouter.post("/", postUser);

// Route GET
userRouter.get("/", getAllUsers);

// Route PUT
userRouter.put("/:id", putUserById);

// Route DELETE
userRouter.delete("/:id", deleteUserById);