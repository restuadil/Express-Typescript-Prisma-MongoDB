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