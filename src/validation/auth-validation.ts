import Joi from "joi";
import { UserResponse } from "../model/user-model";

export const loginValidation = (data: UserResponse) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });

    return schema.validate(data);
};