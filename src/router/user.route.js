import { Router } from "express";

import { UserController } from "../controller/index.js";

const router = Router();

const controller = new UserController();

router
  .post("/register", controller.register)
  .post("/verifyOtp", controller.verifyOtp)
  .post("/login", controller.login)
  .post("/refreshToken", controller.refreshToken)
  .post("/logout", controller.logout);

export { router as userRouter };
