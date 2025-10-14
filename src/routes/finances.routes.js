import express from "express";
import { createFinanceEntry, getFinancial, updateFinancialMove, deleteFinancialMove } from "../controllers/finances.controller.js";


export const financeRouter = express.Router();

// Ruta para el POST Crear Movimiento financiero
financeRouter.post("/", createFinanceEntry);

// Obtener movimientos con filtros
financeRouter.get("/", getFinancial);

// Actualizar movimiento
financeRouter.put("/:id", updateFinancialMove);

// Eliminar movimiento
financeRouter.delete("/:id", deleteFinancialMove);
