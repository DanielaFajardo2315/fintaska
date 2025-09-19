import express from "express";
import { login } from "../services/login.js";

export const loginRouter = express.Router();
loginRouter.post("/", login)