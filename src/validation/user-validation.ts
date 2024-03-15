import Joi from "joi";
import { UserResponse } from "../model/user-model";

export const createUserValidation = (data: UserResponse) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
  });

  return schema.validate(data);
};

export const updateUserValidation = (data: UserResponse) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
  });

  return schema.validate(data);
};
