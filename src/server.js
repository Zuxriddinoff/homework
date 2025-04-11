import express from "express";
import cors from "cors"
import dotenv from "dotenv"

import { config } from "./config/index.js";
import { bookRouter } from "./router/index.js";
import { mongoConnect } from "./db/index.js";

mongoConnect()
dotenv.config()

const app = express();


// middleware
app.use(express.json())
app.use(cors())


app.use("/book", bookRouter)

app.listen(config.api.port, () => console.log(`Server is running on port ${config.api.port}`));
