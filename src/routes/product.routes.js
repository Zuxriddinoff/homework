import { Router } from "express";

import { productController } from "../controllers/prodect.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { productSchema } from "../validations/product.validation.js";
import { authMiddleware } from '../middlewares/authmiddleware.js';

export const productRouter = Router();

productRouter
    .get("/", productController.findAll)
    .get("/:id", productController.findOne)
    .post("/", authMiddleware, validateBody(productSchema.create), productController.create)
    .put("/:id", authMiddleware, validateBody(productSchema.update), productController.update)
    .delete("/:id", authMiddleware, productController.delete);