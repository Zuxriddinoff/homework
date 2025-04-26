import { Router } from "express";
import { AdminController } from "../controller/admin.controller.js";
import { jwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { SuperAdminGuard } from "../middleware/superadmin.guard.js";
import { SelfGuard } from "../middleware/self-admin.guard.js";

const router = Router();
const controller = new AdminController()

router
    .post("/superadmin", controller.createSuperAdmin)
    .post('/', jwtAuthGuard, SuperAdminGuard, controller.createAdmin)
    .post("/signin", controller.singinAdmin)
    .post("/signout", jwtAuthGuard, controller.signoutAdmin)
    .post("/token", controller.acceessToken)
    .get("/", jwtAuthGuard, SuperAdminGuard, controller.getAllAdmins)
    .get("/:id", jwtAuthGuard, SelfGuard, controller.getAdminById)
    .patch("/:id", jwtAuthGuard, SelfGuard, controller.updateAdminById)
    .delete("/:id", jwtAuthGuard, SuperAdminGuard, controller.deleteAdminById)

export default router;