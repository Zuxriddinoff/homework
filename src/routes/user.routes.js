import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();
const controller = new userController();

router
    .post('/', controller.createUser)
    .post('/signin', controller.signin)
    .post('/confirm', controller.confirmSigninUser)
    .post('/signout', controller.signOut)
    .post('/token', controller.accessToken)
    .get('/', controller.getAllUser)
    .get('/:id', controller.getByIdUser)
    .put('/:id', controller.updateUser)
    .delete('/:id', controller.deleteUser)

export default router;