import { HttpError } from "../../helpers/index.js";
import jwt from 'jsonwebtoken'
import Users from "../models/model-users.js";
const {JWT_SECRET} = process.env
 
const autheticate = async(req,req,next) => {
    const {authorization = ""} = req.headers
    const [bearer,token] = authorization.split(' ')
    if(bearer != 'Bearer'){
        throw HttpError(401,'Error,plz send Bearer')
    }
    try {
const {id} = jwt.verify(token,JWT_SECRET)
const user = await Users.findById(id)
if(!user){
    throw HttpError(401)
}
next()
    }catch(error) {
throw HttpError(401,error.message)
    }
}