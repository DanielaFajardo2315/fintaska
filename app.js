import express from "express";
import dotenv from "dotenv";
import { conectMongo } from "./src/config/db.js";
import { userRouter } from "./src/routes/users.routes.js";

const app = express();
dotenv.config();

const port = process.env.PORT;
conectMongo(); //Conexión con DB

app.get("/", (req, res) => {
  res.send("Server works")
});

app.use(express.json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});