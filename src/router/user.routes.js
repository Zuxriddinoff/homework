import express from "express"
import { userController } from "../controller/user.controller.js";

const router = express.Router()

router.post("/", userController.create)
router.put("/:id", userController.update)
router.get("/", userController.getall)
router.get("/:id", userController.getone)
router.delete("/:id", userController.delete)

export {router as userRouter}