//1. Importar dependencias y modulos necesarios
import { tasksModel } from "../models/tasks.model.js";



//. Metodo CREAR un tablero - POST
export const postTasks = async (request, response) => {
    try {
        const { title, description, estatus, category, priority, creationDate, scheduleAt } = request.body;

        const newTask = await tasksModel.create({
            title,
            description,
            estatus,
            category,
            priority,
            creationDate,
            scheduleAt
        });

        return response.status(201).json({
            "mensaje": "Una nueva tarea se ha creado, continua planificando tus días",
            "data": newTask
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "Parece que algo salió mal, no pudimos crear esta tarea",
            "error": error.message || error

        });
    }
}

//2. Metodo para MOSTRAR todos los tableros - GET
export const getAllTasks = async (request, response) => {
    try {
        const allTasks = await tasksModel.find();
        return response.status(200).json({
            "mensaje": "Tarea mostrada exitosamente",
            "data": allTasks
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Parece que algo salió mal, no pudimos mostrar tus tareas, intentalo en un momento",
            "error": error.message || error
        });

    }
}


//3. Metodo Actualizar Tablero - PUT
export const putTasksById = async (request, response) => {

    try {
        const idForUpdate = request.params.id;
        const dataForUpdate = request.body;

        await tasksModel.findByIdAndUpdate(idForUpdate, dataForUpdate);
        return response.status(200).json({
            "mensaje": "¡Genial! Tarea actualizada y lista para conquistar el día"
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Parece que algo salió mal, no pudimos actualizar esta tarea",
            "error": error.message || error
        });

    }
}


//4. Método para ELIMINAR -> DELETE
export const deleteTasksById = async (request, response) => {

    try {
        const idForDelete = request.params.id;
        await tasksModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "mensaje": "Se eliminó esta tarea, puedes continuar planificando tu día",
        })

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Parece que algo salió mal, no pudimos eliminar esta tarea",
            "error": error.message || error
        });


    }
}