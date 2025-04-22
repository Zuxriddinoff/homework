import express from "express";
import { categoryController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { roleGuard } from "../middlewares/role.guard.js";

const router = express.Router()

router.get("/", authMiddleware, categoryController.getall)
router.get("/:id", authMiddleware, categoryController.getOne)
router.post("/", roleGuard("admin", "superadmin"), authMiddleware, categoryController.create)
router.put("/:id", roleGuard("admin", "superadmin"), authMiddleware, categoryController.update)
router.delete("/:id", roleGuard("admin", "superadmin"), authMiddleware, categoryController.delete)

export {router as categoryRouter}