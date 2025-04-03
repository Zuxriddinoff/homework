import { Router } from "express";
import { tournamentGroup } from "../controller/index.js";

const router = Router()

// Tournament Group
router.get("/tournamentsGroup",tournamentGroup.findAllTournamentGroup)
router.get("/tournamentsGroup/:id",tournamentGroup.findOneTournamentGroup)
router.post("/tournamentsGroup", tournamentGroup.createTournamentGroup)
router.put("/tournamentsGroup/:id", tournamentGroup.updateTournamentGroup)
router.delete("/tournamentsGroup/:id", tournamentGroup.deleteTournamentGroup)

export {router as tournamentGroupRouter}