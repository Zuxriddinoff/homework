import { Router } from "express";
import { bookController } from "../controller/index.js";
import { validate } from "../utils/index.js";
import { bookSchema , bookUpdateSchema} from "../validation/index.js";

const router = Router();

router.get("/", bookController.findAll);
router.get("/:id", bookController.findOne);
router.post("/", validate(bookSchema),bookController.create);
router.put("/:id",validate(bookUpdateSchema) ,bookController.update);
router.delete("/:id", bookController.delete);

export { router as bookRouter };
