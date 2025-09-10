import express from "express";
import { postNotifications, getAllNotifications, deleteNotificationById } from "../controllers/notifications.controller.js";

export const notificationRouter = express.Router();

// Route POST
notificationRouter.post("/", postNotifications);

// Route GET
notificationRouter.get("/", getAllNotifications);

// Route DELETE
notificationRouter.delete("/:id", deleteNotificationById);