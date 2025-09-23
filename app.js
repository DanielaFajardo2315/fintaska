import express from "express";
import dotenv from "dotenv";
import { conectMongo } from "./src/config/db.js";
import { userRouter } from "./src/routes/users.routes.js";
import { notificationRouter } from "./src/routes/notifications.routes.js";
import {financeRouter} from "./src/routes/finances.routes.js"; 
import { boardRouter } from "./src/routes/boards.routes.js";
import {tasksRouter} from "./src/routes/tasks.routes.js";
import { loginRouter } from "./src/routes/login.routes.js";
import cors from "cors";
import path from "path"; 
import { fileURLToPath } from "url"; 

const app = express();
dotenv.config();

const port = process.env.PORT;
conectMongo(); //Conexión con DB
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.get("/", (req, res) => {
  res.send("Server works")
});

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/notifications", notificationRouter);
app.use("/finances", financeRouter);
app.use("/boards", boardRouter);
app.use("/tasks", tasksRouter);
app.use("/profile", express.static(path.join(_dirname, "src/uploads/profile")));
app.use("/files", express.static(path.join(_dirname, "src/uploads/files")));
app.use("/login", loginRouter);


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});