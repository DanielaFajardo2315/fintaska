//1. Importar dependencias y modulos necesarios
import { tasksModel } from "../models/tasks.model.js";



//. Metodo CREAR un producto - POST
export const postTasks = async (request, response) => {
    try {
        const { title, description, estatus, category, priority, creationDate } = request.body;
        await tasksModel.create({
            title,
            description,
            estatus,
            category,
            priority,
            creationDate
        });

        return response.status(201).json({
            "mensaje": "Tarea creada exitosamente",
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al crear esta Tarea",
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
            "mensaje": "Ocurrio un error al mostrar esta Tarea",
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
            "mensaje": "Tarea Actualizada exitosamente"
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrio un error al actualizar la tarea",
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
            "mensaje": "Tarea eliminada exitosamente",
        })

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrio un error al eliminar la Tarea",
            "error": error.message || error
        });


    }
}