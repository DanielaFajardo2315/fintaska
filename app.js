import express from "express";
import dotenv from "dotenv";
import { conectMongo } from "./src/config/db.js";
import { boardRouter } from "./src/routers/board.router.js";
import {tasksRouter} from "./src/routers/tasks.router.js";

const app = express();
dotenv.config();

const port = process.env.PORT;
conectMongo(); //Conexión con DB

app.get("/", (req, res) => {
  res.send("Server works")
});


app.use(express.json());//para usar formato json en peticiones y respuestas
app.use("/boards", boardRouter);
app.use ("/tasks", tasksRouter);


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});