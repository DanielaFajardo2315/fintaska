import express from "express";
import {postBoard, getAllBoards, getBoardByTag, putBoardById, deleteBoardById} from "../controllers/boards.controllers.js";
import { uploads } from "../middleware/uploads.multer.js";

//2. Configurar las rutas 
export const boardRouter = express.Router();
const uploadBothOptional = uploads.fields([
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