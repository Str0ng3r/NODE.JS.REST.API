import Contact from "../../models/model-contacts.js";
import Users from "../../models/model-users.js";
import dotenv from "dotenv";
import gravatar from 'gravatar';
import { HttpError } from "../../helpers/index.js";
import fs from 'fs'
import nodemailer from 'nodemailer'

import {
  contactsAddSchema,
  contactUpdateFavoriteSchema,
  usersSchema,
} from "./schemes.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { resizeAvatar } from "../../helpers/resizing.js";
import { nanoid } from "nanoid";
dotenv.config();
const { JWT_SECRET,META_PASSWORD,PORT } = process.env;

export const getAll = async (req, res, next) => {
  try {
    const data = await Contact.find();
    if (!data) {
      throw HttpError(500, "Movies not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(500, "Contacts not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

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
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavorite = async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const favorite = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, favorite, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const registrUser = async (req, res, next) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = await gravatar.url(email)
    const verifyToken =await nanoid()
    const newUser = await Users.create({ ...req.body, password: hashPassword,avatarURL:avatar,verificationToken:verifyToken });
const nodemailerConfig = {
  host:'smtp.meta.ua',
  port:465,
  secure:true,
  auth:{
    user:'maksimillianokey@meta.ua',
    pass:META_PASSWORD
  }
}
const transport = nodemailer.createTransport(nodemailerConfig)

const emailTo = {
  to:email,
  from:'maksimillianokey@meta.ua',
  subject:'Verify Email',
  html:`<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verifyToken}">Click verify email</a>`
}
await transport.sendMail(emailTo)
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req,res,next) => {
  try {
    const folderName = 'tmp';
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  const file = req.file
  console.log(file)
  const { error } = usersSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    const contactId = user._id

const avatarUpd = {
  avatarURL:file.path
}
await resizeAvatar(file.path)
    const result = await Users.findByIdAndUpdate(contactId,avatarUpd, {
      new: true,
    });
    res.status(200).json(avatarUpd)
  }catch (error) {
next(error)
  }
}

export const loginUser = async (req, res) => {
  const { error } = usersSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  if(!user.verify){
    throw HttpError(404,'You re not verify your email')
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const id = user._id;
  const payload = {
    id: user._id,
  };

  const token =  jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  const result = await Users.findByIdAndUpdate(
    id,
    { email: email, password: password, token: token },
    {
      new: true,
    }
  );
  res.json({
    token,
  });
};

export const logOutUser = async (req, res, next) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    const id = user._id;
    const result = await Users.findByIdAndUpdate(
      id,
      { token: null }, // Set the token field to null to remove the token
      { new: true }
    );
    if(result){
      res.json(204)
    }
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req,res,next) => {
  try {
    const {authorization = ""} = req.headers
    const [bearer,token] = authorization.split(' ')
    if(bearer != 'Bearer'){
      throw HttpError(401,'Error,plz send Bearer')
  }
  const {id} = jwt.verify(token,JWT_SECRET)
const user = await Users.findById(id)
if(!user){
  throw HttpError(401,"Not authorized")
}
  const body = {
  email:user.email,
  subsctription:user.subscription
} 
res.json(200,body)
  }catch (error) {
next(error)
  }
}

export const verifyUser = async (req,res,next) => {
try {
const {verificationToken} = req.params
const user = await Users.findOne({ verificationToken });
if (!user) {
  throw HttpError(401, "Email not found");
}
const id = user._id;
const result = await Users.findByIdAndUpdate(
  id,
  {verificationToken:null},
  { verify: true }, // Set the token field to null to remove the token
  { new: true }
);
if(result){
  res.json(200,'Verification successful')
}
}catch(error) {
  next(error)
}
}

export const repeatVerifyUser = async (req,res,next) => {
  try {
  const {email} = req.body
  const user = await Users.findOne({email})
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if(user.verify){
    throw HttpError(401,"Email already verify")
  }
  const nodemailerConfig = {
    host:'smtp.meta.ua',
    port:465,
    secure:true,
    auth:{
      user:'maksimillianokey@meta.ua',
      pass:META_PASSWORD
    }
  }
  const transport = nodemailer.createTransport(nodemailerConfig)
  
  const emailTo = {
    to:email,
    from:'maksimillianokey@meta.ua',
    subject:'Verify Email',
    html:`<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${user.verificationToken}">Click verify email</a>`
  }
  await transport.sendMail(emailTo)
      res.json({
        message:'Verify email send success'
      });
    }catch (error) {
      next(error)
    }
}
