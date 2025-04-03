import { Router } from "express";
import { matchFixtures } from "../controller/index.js";

const router = Router()

// Match Fixture
router.get("/matchFixtures",matchFixtures.findAllMatchFixtures)
router.get("/matchFixtures/:id",matchFixtures.findOneMatchFixture)
router.post("/matchFixtures", matchFixtures.createMatchFixtures)
router.put("/matchFixtures/:id", matchFixtures.updateMatchFixtures)
router.delete("/matchFixtures/:id", matchFixtures.deleteMatchFixtures)

export {router as matchFixtureRouter}