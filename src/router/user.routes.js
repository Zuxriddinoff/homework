import express from "express"
import { userController } from "../controllers/index.js"
import { authController } from "../controllers/index.js"
import { roleGuard } from "../middlewares/role.guard.js";
import { authMiddleware } from "../middlewares/user.middleware.js"
import { generateToken } from "../config/generateToken.js";

const router = express.Router()

router
    .get("/", authMiddleware, userController.getall)
    .get("/:id", authMiddleware, userController.getone)
    .put("/:id", generateToken, roleGuard("admin", "superadmin"),userController.update)
    .delete("/:id", generateToken, roleGuard("admin", "superadmin"), userController.delete)

export {router as userRouter}