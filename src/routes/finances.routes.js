import express from "express";
import { createFinanceEntry } from "../controllers/finances.controller.js";

export const financeRouter = express.Router();