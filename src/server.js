import express from "express"
import adminRouter from './router/user.routes.js'
import cookieParser from "cookie-parser";
import fs from 'fs'
import path from "path";
import morgan from "morgan";

import { connectionDB } from "./db/db.js";
import { config } from "dotenv"
import { memoryUsage } from "process";

config();

const app = express()
const PORT = +process.env.PORT;

app.use(express.json())
app.use(cookieParser())

await connectionDB()


const __dirname = path.resolve();
const filePath = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flag:'a'
})

if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined', {
        stream:filePath
    }))
} else {
    app.use(morgan('dev'))
}

app.use("/admin", adminRouter)

app.listen(PORT, () => console.log(`server is running on port`, PORT))