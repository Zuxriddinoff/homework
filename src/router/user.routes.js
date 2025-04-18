import express from "express"
import { userController } from "../controllers/index.js"
import { authController } from "../controllers/index.js"
import { authMiddleware } from "../middlewares/user.middleware.js"
const router = express.Router()

router
    .get("/", authMiddleware, userController.getall)
    .get("/:id", authMiddleware, userController.getone)
    .put("/:id", userController.update)
    .delete("/:id", userController.delete)

export {router as userRouter}