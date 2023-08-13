import express from "express";
import {registrUser,loginUser, logOutUser, getCurrentUser, updateAvatar,verifyUser,repeatVerifyUser} from "./controllers.js";
import upload from "../../middlewears/upload.js";
import autheticate from "../../middlewears/autheticate.js";
const usersRouter = express.Router();

usersRouter.post('/users/register',registrUser)

usersRouter.post('/users/login',loginUser)

usersRouter.post('/users/logout',autheticate,logOutUser)

usersRouter.get('/users/current',autheticate,getCurrentUser)

usersRouter.patch('/users/avatars',upload.single('avatarURL'),updateAvatar)

usersRouter.get('/users/verify/:verificationToken',verifyUser)

usersRouter.post('/users/verify',repeatVerifyUser)



export default usersRouter;
