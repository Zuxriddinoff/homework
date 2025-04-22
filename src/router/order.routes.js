import express from "express";
import { orderController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { roleGuard } from "../middlewares/role.guard.js";
import { generateToken } from "../config/generateToken.js";



const router = express.Router();

router.get("/", authMiddleware, orderController.getall);
router.get("/:id", authMiddleware, orderController.getOne);
router.post("/", generateToken, roleGuard("admin", "superadmin"), authMiddleware, orderController.create);
router.put("/:id", generateToken, roleGuard("admin", "superadmin"), authMiddleware, orderController.update);
router.delete("/:id", generateToken, roleGuard("admin", "superadmin"), authMiddleware, orderController.delete);

export { router as orderRouter };
