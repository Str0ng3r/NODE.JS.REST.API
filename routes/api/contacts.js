import express from "express";
import { getAll,getById,addNewContact,deleteContact,updateContact,updateFavorite,registrUser } from "./controllers.js";

const contactsRouter = express.Router();


contactsRouter.get("/", getAll);

contactsRouter.get("/:contactId", getById);

contactsRouter.post("/", addNewContact);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.put("/:contactId", updateContact);

contactsRouter.patch('/:contactId/favorite',updateFavorite)

contactsRouter.post('/users/register',registrUser)

export default contactsRouter;
