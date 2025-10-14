import { notificationModel } from "../models/notifications.model.js";
import { scheduleNotifications } from "../services/notifications.js";

// Método POST
export const postNotifications = async (request, response) => {
    try {
        await notificationModel.create(request.body);
        return response.status(201).json({
            "message": "Notification created correctly"
        });

    } catch (error) {
        return response.status(400).json({
            "message": "An error occurred while creating notification.",
            "error": error.message || error
        })
    }
}

// Método GET
export const getAllNotifications = async (request, response) => {
    try {
        const allNotifications = await notificationModel.find().sort({ date: -1 });
        return response.status(200).json({
            "message": "Estas son todas tus notificaciones:",
            "total": allNotifications.length,
            "data": allNotifications
        });

    } catch (error) {
        return response.status(500).json({
            "message": "Ups! Ocurrió un error al mostrar todas tus notificaciones, vuelve a intentarlo.",
            "error": error.message || error
        })
    }
}

// Método GET - Obtener notificaciones no leídas
export const getUnreadNotifications = async (request, response) => {
    try {
        const unreadNotifications = await notificationModel
            .find({ read: false })
            .sort({ date: -1 });
        if (unreadNotifications.length === 0) {
            return response.status(404).json({
                message: "Sin notificaciones por ahora. ¡Buen trabajo! Añade tu próxima tarea o planifica tus ahorros o deudas para seguir en control."
            });
        } else {
            if (unreadNotifications.length === 1) {
                return response.status(200).json({
                    message: `¡Tienes cosas importantes esperando! Hay ${unreadNotifications.length} notificación que necesita atención`,
                    total: unreadNotifications.length,
                    data: unreadNotifications
                });
            } else {
                return response.status(200).json({
                    message: `¡Tienes cosas importantes esperando! Hay ${unreadNotifications.length} notificaciones que necesitan atención`,
                    total: unreadNotifications.length,
                    data: unreadNotifications
                });
            }
        }
    } catch (error) {
        return response.status(500).json({
            message: "Ups! Ocurrió un error al mostrar tus notificaciones no leidas, vuelve a intentarlo.",
            error: error.message || error
        });
    }
}

// Método PATCH - Marcar notificación como leída
export const markAsRead = async (request, response) => {
    try {
        const notificationId = request.params.id;

        const updatedNotification = await notificationModel.findByIdAndUpdate(
            notificationId,
            { read: true },
            { new: true }
        );

        if (!updatedNotification) {
            return response.status(404).json({
                message: "No se encontró la notificación que buscas, intentalo de nuevo"
            });
        }

        return response.status(200).json({
            message: "¡Bien hecho! Has cumplido con esta notificación, sigue así",
            data: updatedNotification
        });
    } catch (error) {
        return response.status(400).json({
            message: "Ups! Ocurrió un error al marcar tu notificación como hecha, vuelve a intentarlo.",
            error: error.message || error
        });
    }
}

// Método DELETE
export const deleteNotificationById = async (request, response) => {
    try {
        const idForDelete = request.params.id;

        await notificationModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "message": "Notificación eliminada exitosamente"
        });

    } catch (error) {
        return response.status(400).json({
            "message": "An error occurred while deleting notification.",
            "error": error.message || error
        })
    }
}