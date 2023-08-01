// import bcrypt from 'bcrypt'
// import Users from "../../models/model-users.js";
// import ctrlWrapper from '../decorators/ctrlWrapper.js';
// const {JWT_SECRET} = process.env
// import { HttpError } from "../../helpers/index.js";
//  const registrUser = async(req,res,next) => {
//     try {
//       const {email, password} = req.body;
//       const user = await Users.findOne({email});
//       if(user) {
//         throw HttpError(409, "Email in use");
//     }
//     const hashPassword = await bcrypt.hash(password, 10);
//     const newUser = await Users.create({...req.body, password: hashPassword});
// res.status(201).json({
//   name: newUser.name,
//   email: newUser.email,
// })
// }catch (error) {
// next(error)
//     }
//   }
  

//   const loginUser = async(req, res) => {
//     const {email, password} = req.body;
//     const user = await Users.findOne({email});
//     if(!user) {
//         throw HttpError(401, "Email or password invalid");
//     }

//     const passwordCompare = await bcrypt.compare(password, user.password);
//     if(!passwordCompare) {
//         throw HttpError(401, "Email or password invalid");
//     }

//     const payload = {
//         id: user._id,
//     }

//     const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});

//     res.json({
//         token,
//     })
// }

// export default {
//     registrUser: ctrlWrapper(registrUser),
//     loginUser: ctrlWrapper(loginUser),
// }