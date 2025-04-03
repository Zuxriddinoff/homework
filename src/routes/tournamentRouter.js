import { Router } from "express";
import { tournament } from "../controller/index.js";

const router = Router()

// Tournament
router.get("/tournaments",tournament.findAllTournament)
router.get("/tournaments/:id",tournament.findOneTournament)
router.post("/tournaments", tournament.createTournament)
router.put("/tournaments/:id", tournament.updateTournament)
router.delete("/tournaments/:id", tournament.deleteTournament)


export {router as tournamentRouter}



