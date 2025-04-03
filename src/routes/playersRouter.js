import { Router } from "express";
import { players } from "../controller/index.js";

const router = Router()

// Players
router.get("/players",players.findAllPlayers)
router.get("/players/:id",players.findOnePlayer)
router.post("/players", players.createPlayers)
router.put("/players/:id", players.updatePlayers)
router.delete("/players/:id", players.deletePlayers)

export {router as playersRouter}