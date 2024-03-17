import Joi from "joi";
import { UserResponse } from "../model/user-model";

export const createUserValidation = (data: UserResponse) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().valid("USER", "ADMIN").default("USER"),
    first_name: Joi.string().optional().trim(),
    last_name: Joi.string().optional().trim(),
  });

  return schema.validate(data);
};

export const updateUserValidation = (data: UserResponse) => {
  const schema = Joi.object({
    username: Joi.string().min(5),
    email: Joi.string().email(),
    password: Joi.string().min(5),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
  });

  return schema.validate(data);
};
