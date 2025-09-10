import express from "express";
import dotenv from "dotenv";
import { conectMongo } from "./src/config/db.js";
import { userRouter } from "./src/routes/users.routes.js";
import { notificationRouter } from "./src/routes/notifications.routes.js";
import {financeRouter} from "./src/routes/finances.routes.js"; 
import { boardRouter } from "./src/routes/boards.routes.js";
import {tasksRouter} from "./src/routes/tasks.routes.js";

const app = express();
dotenv.config();

const port = process.env.PORT;
conectMongo(); //Conexión con DB

app.get("/", (req, res) => {
  res.send("Server works")
});

app.use(express.json());
app.use("/users", userRouter);
app.use("/notifications", notificationRouter);
app.use ("/finances", financeRouter);
app.use("/boards", boardRouter);
app.use ("/tasks", tasksRouter);


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});