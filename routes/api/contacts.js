import express from "express";
import { HttpError } from "../../helpers/index.js";
import Contact from "../../models/model-contacts.js";
import Joi from "joi";
// import isValidid from "../../helpers/index.js";

const contactsRouter = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).custom((value, helpers) => {
  if (!value) {
    return helpers.error("any.custom", { message: "Field 'id' must be present" });
  }
  return value;
});

contactsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Contact.find();
    if (!data) {
      throw HttpError(500, "Movies not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
    if (!result) {
      throw HttpError(500, "Contacts not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const body = req.body;
    const result = await Contact.create(body);
    if (!result) {
      throw HttpError(400, "missing required name field");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndRemove(contactId)
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
