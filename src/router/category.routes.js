import express from "express";
import { categoryController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router()

router.get("/", authMiddleware, categoryController.getall)
router.get("/:id", authMiddleware, categoryController.getOne)
router.post("/", authMiddleware, categoryController.create)
router.put("/:id", authMiddleware, categoryController.update)
router.delete("/:id", authMiddleware, categoryController.delete)

export {router as categoryRouter}