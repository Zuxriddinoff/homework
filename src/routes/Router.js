import { Router } from "express";
import { Contoller } from "../controller/index.js";

const router = Router()

router.get("/tournaments",Contoller.findAllTournament)
router.get("/tournamentsGroup",Contoller.findAllTournamentGroup)
router.get("/footballClubs",Contoller.findAllFootballClubs)
router.get("/players",Contoller.findAllPlayers)
router.get("/matchFixtures",Contoller.findAllMatchFixtures)
router.get("/teams",Contoller.findAllTeams)
router.get("/tournaments/:id",Contoller.findOneTournament)
router.get("/tournamentsGroup/:id",Contoller.findOneTournamentGroup)
router.get("/footballClubs/:id",Contoller.findOneFootballClubs)
router.get("/players/:id",Contoller.findOnePlayer)
router.get("/matchFixtures/:id",Contoller.findOneMatchFixture)
router.get("/teams/:id",Contoller.findOneTeam)
router.post("/tournaments", Contoller.createTournament)
router.post("/tournamentsGroup", Contoller.createTournamentGroup)
router.post("/footballClubs", Contoller.createFootballClubs)
router.post("/players", Contoller.createPlayers)
router.post("/matchFixtures", Contoller.createMatchFixtures)
router.post("/teams", Contoller.createTeams)
router.put("/tournaments/:id", Contoller.updateTournament)
router.put("/tournamentsGroup/:id", Contoller.updateTournamentGroup)
router.put("/footballClubs/:id", Contoller.updateFootballClubs)
router.put("/players/:id", Contoller.updatePlayers)
router.put("/matchFixtures/:id", Contoller.updateMatchFixtures)
router.put("/teams/:id", Contoller.updateTeams)
router.delete("/tournaments/:id", Contoller.deleteTournament)
router.delete("/tournamentsGroup/:id", Contoller.deleteTournamentGroup)
router.delete("/footballClubs/:id", Contoller.deleteFootballClubs)
router.delete("/players/:id", Contoller.deletePlayers)
router.delete("/matchFixtures/:id", Contoller.deleteMatchFixtures)
router.delete("/teams/:id", Contoller.deleteTeams)


export {router}



