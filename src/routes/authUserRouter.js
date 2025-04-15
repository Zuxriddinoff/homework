import { Router } from "express";
import { authUserController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import {
  authUserSchemaValidationRegister,
  authUserSchemaValidationLogin,
} from "../validators/index.js";

const app = Router();

app.post(
  "/register",
  validateBody(authUserSchemaValidationRegister),
  authUserController.register
);
app.post(
  "/login",
  validateBody(authUserSchemaValidationLogin),
  authUserController.login
);

export { app as authUserRouter };
