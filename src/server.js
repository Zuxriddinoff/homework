import express from "express"
import dotenv from "dotenv"
import { config } from "./config/db.js"
import { connectionDB } from "./db/db.js"
import { userRouter } from "./router/index.js"

dotenv.config()
const PORT = config.port || 5555

const app = express()
app.use(express.json())

app.use("/user", userRouter)

connectionDB()
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})