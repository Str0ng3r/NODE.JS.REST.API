import express from "express";
import { HttpError } from "../../helpers/index.js";
import Contact from "../../models/model-contacts.js";
import { contactsAddSchema,contactUpdateFavoriteSchema } from "./schemes.js";
// import isValidid from "../../helpers/index.js";
import { getAll,getById,addNewContact,deleteContact,updateContact,updateFavorite } from "./controllers.js";

const contactsRouter = express.Router();


contactsRouter.get("/", getAll);

contactsRouter.get("/:contactId", getById);

contactsRouter.post("/", addNewContact);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.put("/:contactId", updateContact);

contactsRouter.patch('/:contactId/favorite',updateFavorite)

export default contactsRouter;
