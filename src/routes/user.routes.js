import {Router} from 'express';

import {validateBody} from '../middlewares/validation.middleware.js';
import {userSchema} from '../validations/user.validation.js';
import {userController} from '../controllers/user.controller.js';

export const userRouter = Router();

userRouter
    .get('/:id',userController.profile)
    .put('/:id', validateBody(userSchema.update), userController.update)
    .delete('/:id', userController.delete);