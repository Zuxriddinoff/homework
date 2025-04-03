import { Router } from "express";
import { teams } from "../controller/index.js";

const router = Router()

// Teams
router.get("/teams",teams.findAllTeams)
router.get("/teams/:id",teams.findOneTeam)
router.post("/teams", teams.createTeams)
router.put("/teams/:id", teams.updateTeams)
router.delete("/teams/:id", teams.deleteTeams)

export {router as teamsRouter}