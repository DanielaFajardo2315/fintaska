import express from "express";
import { postNotifications, getAllNotifications, deleteNotificationById } from "../controllers/notifications.controller.js";
import { scheduleNotifications } from "../services/notifications.js";

export const notificationRouter = express.Router();

// Route POST
notificationRouter.post("/", postNotifications);

// Route GET
notificationRouter.get("/", getAllNotifications);
notificationRouter.get("/pending", scheduleNotifications);

// Route DELETE
notificationRouter.delete("/:id", deleteNotificationById);