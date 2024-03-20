import Joi from "joi";
import { ProductRequest } from "../model/product-model";

export const createProductValidation = (data: ProductRequest) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        description: Joi.string().min(5).required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
    });

    return schema.validate(data);
};

export const updateProductValidation = (data: ProductRequest) => {
    const schema = Joi.object({
        name: Joi.string().min(5),
        description: Joi.string().min(5),
        price: Joi.number(),
        category: Joi.string(),
    });

    return schema.validate(data);
}