import { Router } from "express";

import { CourseController } from "../controller/index.js";

const router = Router();

const controller = new CourseController();

router.get("/courses", controller.getAll).post("/courses", controller.create);

export { router as courseRouter };
