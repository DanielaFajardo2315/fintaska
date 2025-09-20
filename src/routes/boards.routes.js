import express from "express";
import {postBoard, getAllBoards, getBoardByTag, putBoardById, deleteBoardById} from "../controllers/boards.controllers.js";
import { uploadByImage } from "../middleware/images.multer.js";
import { uploadByDocument } from "../middleware/documents.multer.js"
import multer from "multer";

//2. Configurar las rutas 
export const boardRouter = express.Router();
const uploadBothOptional = multer().fields([
  { name: "urlImage", maxCount: 1 },
  { name: "urlFile", maxCount: 1 }
]);

//Ruta para el POST
boardRouter.post("/", uploadBothOptional, postBoard);

//Ruta para el GET
boardRouter.get("/", getAllBoards);
boardRouter.get("/:tag", getBoardByTag);

//Ruta para el PUT
boardRouter.put("/:id", uploadBothOptional, putBoardById);


//Ruta para el DELETE
boardRouter.delete("/:id", deleteBoardById);