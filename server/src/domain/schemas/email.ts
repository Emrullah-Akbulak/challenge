import Joi from "joi";

export const EmailGenerationSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[\p{L}' -]+$/u)
    .message("Invalid first name")
    .min(1)
    .required(),
  lastName: Joi.string()
    .pattern(/^[\p{L}' -]+$/u)
    .message("Invalid last name")
    .min(1)
    .required(),
  domain: Joi.string().domain().message("Invalid domain").min(2).required(),
});
