import express from "express";
import {postBoard, getAllBoards, getBoardByTag, putBoardById, deleteBoardById} from "../controllers/boards.controllers.js";

//2. Configurar las rutas 
export const boardRouter = express.Router();

//Ruta para el POST
boardRouter.post("/", postBoard);

//Ruta para el GET
boardRouter.get("/", getAllBoards);
boardRouter.get("/:tag", getBoardByTag);

//Ruta para el PUT
boardRouter.put("/:id" , putBoardById);


//Ruta para el DELETE
boardRouter.delete("/:id", deleteBoardById);