import { Router } from "express";
import { footballClubs } from "../controller/index.js";

const router = Router()

// Football Clubs
router.get("/footballClubs",footballClubs.findAllFootballClubs)
router.get("/footballClubs/:id",footballClubs.findOneFootballClubs)
router.post("/footballClubs", footballClubs.createFootballClubs)
router.put("/footballClubs/:id", footballClubs.updateFootballClubs)
router.delete("/footballClubs/:id", footballClubs.deleteFootballClubs)

export {router as footballClubsRouter}