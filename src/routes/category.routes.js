import { Router } from "express";

import { categoryController } from "../controllers/category.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { categorySchema } from "../validations/category.validation.js";

export const categoryRouter = Router();

categoryRouter
    .post("/", validateBody(categorySchema.createAndUpdate), categoryController.create)
    .get("/", categoryController.findAll)
    .get("/:id", categoryController.findOne)
    .put("/:id", validateBody(categorySchema.createAndUpdate), categoryController.update)
    .delete("/:id", categoryController.delete);