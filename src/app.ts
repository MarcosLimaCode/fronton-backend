import express, { json } from "express";
import dotenv from "dotenv";
import router from "routers/newsRouter";

dotenv.config();
const app = express();
app.use(json());

app.use(router);

export default app;
