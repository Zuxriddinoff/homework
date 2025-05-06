import { Router } from "express";
import { GraphController } from "../controllers/graph.controller.js";
import {doctorGuard} from "../middleware/doctor.guard.js"
import {JwtAuthGuard} from "../middleware/jwt-auth.guard.js"
import {SelfGuard} from "../middleware/self-admin.guard.js"

const router = Router()
const controller = new GraphController

router
    .post("/",JwtAuthGuard, doctorGuard, controller.creategraph)
    .get('/', controller.getAllGraph)
    .get("/:id", controller.getGraphById)
    .patch("/:id", JwtAuthGuard, SelfGuard, controller.updateGraphById)
    .delete("/:id", JwtAuthGuard, doctorGuard, SelfGuard,  controller.deleteGraphById)

export default router