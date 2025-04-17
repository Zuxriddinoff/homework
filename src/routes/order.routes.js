import { Router } from "express";

import { orderController } from "../controllers/order.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { orderSchema } from "../validations/order.validation.js";
import { authMiddleware } from '../middlewares/authmiddleware.js';


export const orderRouter = Router();

orderRouter
    .get("/", orderController.findAll)
    .get("/:id", orderController.findOne)
    .post("/", authMiddleware, validateBody(orderSchema.create), orderController.create)
    .put("/:id", authMiddleware, validateBody(orderSchema.update), orderController.update)
    .delete("/:id", authMiddleware, orderController.delete);