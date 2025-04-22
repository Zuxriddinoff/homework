import express from "express";
import { productController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { roleGuard } from "../middlewares/role.guard.js";
import { generateToken } from "../config/generateToken.js";


const router = express.Router();

router.get("/", authMiddleware, productController.getall);
router.get("/:id", authMiddleware, productController.getOne);
router.post("/", generateToken, authMiddleware, roleGuard("admin", "superadmin"), productController.create);
router.put("/:id", generateToken, authMiddleware, roleGuard("admin", "superadmin"), productController.update);
router.delete("/:id", generateToken, authMiddleware, roleGuard("admin", "superadmin"), productController.delete);

export { router as productRouter };
