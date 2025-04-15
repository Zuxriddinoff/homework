import express from "express";
import cors from "cors"
import { mainRouter } from "./routes/index.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors())

app.use("/enrollment", mainRouter)
export { app as ServerApp };
