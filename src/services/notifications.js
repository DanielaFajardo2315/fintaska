import { tasksModel } from "../models/tasks.model.js";
import { financeModel } from "../models/finances.model.js";
import { notificationModel } from "../models/notifications.model.js";

export const scheduleNotifications = async (request, response) => {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

    console.log("Fecha actual: ", currentDate);
    console.log("Fecha inicio: ", startOfDay);
    console.log("Fecha final: ", endOfDay);
    try {
        // VALIDACIÓN 1: Crear tareas
        const pendingTasks = await tasksModel.find({
            scheduleAt: {
                $exists: true,
                $gte: startOfDay, //>= fechas que sean mayor o igual a ese día
                $lte: endOfDay //<= fechas que sean menor o igual a ese día
            }
        });
        console.log("Tarea pendiente:", pendingTasks);

        // VALIDACIÓN 2: Crear finanzas
        const pendingFinances = await financeModel.find({
            type: { $in: ["deuda", "ahorro"] }, //busca dentro del arreglo de datos si encuentra estos tipos
            scheduleAt: {
                $exists: true,
                $gte: startOfDay, //>= fechas que sean mayor o igual a ese día
                $lte: endOfDay //<= fechas que sean menor o igual a ese día
            }
        });
        console.log("Finanza pendiente: ", pendingFinances);

        if (pendingTasks.length === 0 && pendingFinances.length === 0) {
            return response.status(404).json({
                "mensaje": "No hay tareas pendientes para el día de hoy"
            })
        }
        // Creación de notificaciones según tareas pendientes
        for(const task of pendingTasks) {
            const exist = await notificationModel.findOne({
                type: "tarea",
                mesage: task.title
            });
            if (!exist) {
                await notificationModel.create({
                    mesage: task.title,
                    type: "tarea"
                });
            }
            if (task.scheduleAt != pendingTasks.scheduleAt) {
                await notificationModel.deleteOne();
            }
        }
        // Creación de notificaciones según finanzas pendientes
        pendingFinances.forEach(async finances => {
            const exist = await notificationModel.findOne({
                type: "finanza",
                mesage: finances.description
            });
            if (!exist) {
                await notificationModel.create({
                    mesage: finances.description,
                    type: "finanza"
                });
            }
            if (finances.scheduleAt != pendingFinances.scheduleAt) {
                await notificationModel.deleteOne();
            }
        });
        return response.status(200).json({
            "mensaje": "Estas son tus notificaciones"
        });
    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al crear notificaciones",
            "error": error.message || error
        });
    }
}