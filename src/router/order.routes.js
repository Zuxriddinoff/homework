import express from "express";
import { orderController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, orderController.getall);
router.get("/:id", authMiddleware, orderController.getOne);
router.post("/", authMiddleware, orderController.create);
router.put("/:id", authMiddleware, orderController.update);
router.delete("/:id", authMiddleware, orderController.delete);

export { router as orderRouter };
