import { Router } from "express";

import { CategoryController } from '../controllers/category.controller.js';

const router = Router();
const controller = new CategoryController();

router
    .post('/', controller.create)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export { router as categoryRouter }