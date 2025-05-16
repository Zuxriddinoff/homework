import { Router } from "express";

import { ProductController } from '../controllers/product.controller.js';

const router = Router();
const controller = new ProductController();

router
    .post('/', controller.create)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export { router as productRouter }