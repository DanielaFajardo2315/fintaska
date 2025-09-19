import express from "express";
import {postBoard, getAllBoards, getBoardByTag, putBoardById, deleteBoardById} from "../controllers/boards.controllers.js";
import { uploadByImage } from "../middleware/images.multer.js";
import { uploadByDocument } from "../middleware/documents.multer.js"

//2. Configurar las rutas 
export const boardRouter = express.Router();

//Ruta para el POST
boardRouter.post("/", uploadByImage.single("urlImage"), uploadByDocument.single("urlFile"), postBoard);

//Ruta para el GET
boardRouter.get("/", getAllBoards);
boardRouter.get("/:tag", getBoardByTag);

//Ruta para el PUT
boardRouter.put("/:id", uploadByImage.single("urlImage"), putBoardById);


//Ruta para el DELETE
boardRouter.delete("/:id", deleteBoardById);