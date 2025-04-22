import express from "express";
import { categoryController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { roleGuard } from "../middlewares/role.guard.js";
import { generateToken } from "../config/generateToken.js";

const router = express.Router()

router.get("/", authMiddleware, categoryController.getall)
router.get("/:id", authMiddleware, categoryController.getOne)
router.post("/", generateToken, roleGuard("admin", "superadmin"), authMiddleware, categoryController.create)
router.put("/:id", generateToken, roleGuard("admin", "superadmin"), authMiddleware, categoryController.update)
router.delete("/:id", generateToken, roleGuard("admin", "superadmin"), authMiddleware, categoryController.delete)

export {router as categoryRouter}