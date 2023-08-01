import express from "express";
import { getAll,getById,addNewContact,deleteContact,updateContact,updateFavorite} from "./controllers.js";
import autheticate from "../../autheticate.js";
const contactsRouter = express.Router();


contactsRouter.get("/", getAll);

contactsRouter.get("/:contactId", getById);

contactsRouter.post("/",autheticate, addNewContact);

contactsRouter.delete("/:contactId",autheticate, deleteContact);

contactsRouter.put("/:contactId",autheticate, updateContact);

contactsRouter.patch('/:contactId/favorite',autheticate,updateFavorite)

export default contactsRouter;
