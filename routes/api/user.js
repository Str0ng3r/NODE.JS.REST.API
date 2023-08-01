import express from "express";
import {registrUser,loginUser, logOutUser, getCurrentUser} from "./controllers.js";
import autheticate from "../../autheticate.js";
const usersRouter = express.Router();

usersRouter.post('/users/register',registrUser)

usersRouter.post('/users/login',loginUser)

usersRouter.post('/users/logout',autheticate,logOutUser)

usersRouter.get('/users/current',autheticate,getCurrentUser)



export default usersRouter;
