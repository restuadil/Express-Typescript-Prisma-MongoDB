import Joi from "joi";
import { ProductRequest } from "../model/product-model";

export const createProductValidation = (data: ProductRequest) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
    });

    return schema.validate(data);
};