import Joi from "joi";


const user = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(4).max(20).required()
});


export const userValidator = (data) => {
    return user.validate(data);
};