import { Router } from "express";

import { TeacherController } from "../controller/index.js";
import { jwtAuthGuard, selfAuthGuard } from "../middleware/index.js";

const router = Router();

const controller = new TeacherController();

router.post(
  "/teacher",
  jwtAuthGuard,
  selfAuthGuard,
  controller.registerTeacher
);

export { router as teacherRouter };
