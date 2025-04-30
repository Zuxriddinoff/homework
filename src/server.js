import express from "express"
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import { connectionDB } from "./db/db.js";
import adminRouter from './router/user.routes.js'
import morgan from "morgan";
config();

const app = express()
const PORT = +process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

await connectionDB()

app.use("/admin", adminRouter)

app.listen(PORT, () => console.log(`server is running on port`, PORT))