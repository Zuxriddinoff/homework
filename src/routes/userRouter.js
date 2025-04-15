import { Router } from "express";
import { userController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import { userSchemaValidation } from "../validators/index.js";

const app = Router();

app.get("/users", userController.findAll);
app.get("/me/:id", userController.findOne);
app.post("/enroll", validateBody(userSchemaValidation), userController.create);

export { app as userRouter };
