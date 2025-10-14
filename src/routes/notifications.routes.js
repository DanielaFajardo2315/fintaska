import express from "express";
import { postNotifications, getAllNotifications, deleteNotificationById, getUnreadNotifications,markAsRead } from "../controllers/notifications.controller.js";
import { scheduleNotifications } from "../services/notifications.js";

export const notificationRouter = express.Router();

// Route POST
notificationRouter.post("/", postNotifications);

// Ruta para obtener notificaciones no leídas
notificationRouter.get("/unread", getUnreadNotifications);

// Route GET
notificationRouter.get("/", getAllNotifications);
notificationRouter.get("/pending", scheduleNotifications);

// Ruta para marcar como leída
notificationRouter.patch("/:id/read", markAsRead);

// Route DELETE
notificationRouter.delete("/:id", deleteNotificationById);