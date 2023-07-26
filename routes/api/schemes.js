import Joi from "joi";

export const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }).custom((value, helpers) => {
    if (!value) {
      return helpers.error("any.custom", { message: "Field 'id' must be present" });
    }
    return value;
  });
  
  
  
 export const contactUpdateFavoriteSchema = Joi.object({
    favorite:Joi.boolean().required()
  })
  