import { Router } from "express";

import { courseRouter, userRouter, authUserRouter } from "./index.js";

const router = Router();

router.use("/api/courses", courseRouter);
router.use("/api", userRouter);
router.use("/api/auth", authUserRouter);

export { router as mainRouter };
