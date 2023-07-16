import express from "express";
import { listContacts } from "../../models/contacts.js";
import { getContactById } from "../../models/contacts.js";
import { removeContact } from "../../models/contacts.js";
import { addContact } from "../../models/contacts.js";
import { updateContact } from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

import Joi from "joi";

const contactsRouter = express.Router();

const contactsAddSchema = Joi.object({
  id: Joi.string().required(),
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
    const data = await listContacts();
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
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(500, "Movies not found");
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
    const result = await addContact(body);
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
    const result = await removeContact(contactId);
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
    const { error } = contactsAddSchema.validate(req.body);
    console.log(error)
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const body = req.body;
    const result = await updateContact(contactId, body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
