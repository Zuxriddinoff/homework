import express from "express"
import cors from "cors"
import pg from "pg"

const {Pool} = pg

import { middleware } from "./middleware/index.js"
import {footballClubsRouter,matchFixtureRouter,
        playersRouter,teamsRouter,
        tournamentGroupRouter,tournamentRouter} from "./routes/index.js"

const app = express()
const PORT = 3000
const con = new Pool({
    user: "postgres",
    password:"2703",
    host:"localhost",
    port: 5432,
    database: "game_football"
})

await con.connect().then(()=> console.log(`Database connected`))




// middleware
app.use(express.json())
app.use(cors())
app.use(middleware)


app.use("/gf",footballClubsRouter,matchFixtureRouter,playersRouter,
              teamsRouter,tournamentGroupRouter,tournamentRouter)

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))

export {con as dbCon}

