
import Contact from "../../models/model-contacts.js";
import Users from "../../models/model-users.js";
import { HttpError } from "../../helpers/index.js";
import { contactsAddSchema,contactUpdateFavoriteSchema,usersSchema } from "./schemes.js";
import bcrypt from 'bcrypt'

export  const getAll = async  (req, res, next) => {
    try {
      const data = await Contact.find();
      if (!data) {
        throw HttpError(500, "Movies not found");
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  export const getById = async (req, res, next) => {
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
  }

  export const addNewContact = async (req, res, next) => {
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
  }

  export const deleteContact = async (req, res, next) => {
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
  }

  export const updateContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const body = req.body;
      const result = await Contact.findByIdAndUpdate(contactId, body,{new:true});
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  export const updateFavorite = async (req,res,next) => {
    try {
      const { error } = contactUpdateFavoriteSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const {contactId} = req.params
  const favorite = req.body
  const result = await Contact.findByIdAndUpdate(contactId,favorite,{new:true})
  if(!result){
    throw HttpError(404, "Not found");
  }
  res.json(result)
    }catch (error) {
      next(error)
    }
  }

  export const registrUser = async(req,res,next) => {
    try {
      const {email, password} = req.body;
      const user = await Users.findOne({email});
      if(user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({...req.body, password: hashPassword});
res.status(201).json({
  name: newUser.name,
  email: newUser.email,
})
}catch (error) {
next(error)
    }
  }
  