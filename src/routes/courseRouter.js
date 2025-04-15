import { Router } from "express";
import { courseController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import { courseSchemaValidation } from "../validators/index.js";

const app = Router();

app.get("/", courseController.findAll);
app.post("/", validateBody(courseSchemaValidation), courseController.create);

export { app as courseRouter };
