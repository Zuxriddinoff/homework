import { Router } from "express";

import {
  AdminRouter,
  courseRouter,
  superAdminRouter,
  userRouter,
} from "./index.js";

const router = Router();

router
  .use("/api/auth", userRouter)
  .use("/api/auth", superAdminRouter)
  .use("/api/auth", AdminRouter)
  .use("/api", courseRouter);

export { router as mainRouter };
