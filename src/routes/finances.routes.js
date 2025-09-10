import express from "express";
import { createFinanceEntry, getFinancialMoveByUser, updateFinancialMove, deleteFinancialMove } from "../controllers/finances.controller.js";


export const financeRouter = express.Router();

// Ruta para el POST Crear Movimiento financiero
financeRouter.post("/", createFinanceEntry);

// Obtener movimientos con filtros
financeRouter.get("/:userId", getFinancialMoveByUser);

// Actualizar movimiento
financeRouter.put("/:id", updateFinancialMove);

// Eliminar movimiento
financeRouter.delete("/:id", deleteFinancialMove);
