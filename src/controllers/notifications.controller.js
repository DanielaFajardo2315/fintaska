import { notificationModel } from "../models/notifications.model.js";

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
        const allNotifications = await notificationModel.find();
        return response.status(200).json({
            "message": "Notifications found",
            "data": allNotifications
        });

    } catch (error) {
        return response.status(500).json({
            "message": "An error occurred while getting notifications.",
            "error": error.message || error
        })
    }
}

// Método DELETE
export const deleteNotificationById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        
        await notificationModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "message": "Notification successfully deleted"
        });

    } catch (error) {
        return response.status(400).json({
            "message": "An error occurred while deleting notification.",
            "error": error.message || error
        })
    }
}