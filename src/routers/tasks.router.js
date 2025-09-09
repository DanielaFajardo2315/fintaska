import express from "express";
import {postTasks, getAllTasks,  putTasksById, deleteTasksById,} from "../controllers/tasks.controllers.js";


//2. Configurar las rutas 
export const tasksRouter = express.Router();

//Ruta para el POST
tasksRouter.post("/", postTasks);


//Ruta para el GET
tasksRouter.get("/", getAllTasks);


//Ruta para el PUT
tasksRouter.put("/:id" , putTasksById);


//Ruta para el DELETE
tasksRouter.delete("/:id", deleteTasksById);

