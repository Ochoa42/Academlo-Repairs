import { UserService } from "./users.service.js"
import { validateUser, validatePartialUser } from "./users.schema.js"
import { catchAsync } from "../../common/errors/catchAsync.js";

export const register = catchAsync( async(req,res,next) => {
      const { hasError , errorMessages , userData} = validateUser(req.body); // aquie no se necesita desestructurar por que zod ya lo hace internam
      if(hasError) {
          return res.status(422).json({
              status: 'error',
              message: errorMessages,
          });
      }
      const user = await UserService.create(userData)
      return res.status(201).json(user)
});




export const findAllUsers = catchAsync(async(req, res,next) => {
    const users = await UserService.findAll()
    return res.status(200).json(users)
});




export const createUser = catchAsync(async(req, res,next) => {
    const { name, email, password, role } = req.body;
    const user = await UserService.create({ name, email, password, role })
    return res.status(201).json(user)
  
});



export const findOneUser = catchAsync(async(req, res) => {
    const { id } = req.params;
    const user = await UserService.findOne(id);
    if(!user){
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      })
    }
    return res.status(200).json(user)
});




export const updateUser =catchAsync(async(req, res,next) => {
    const {user} = req;
    const {hasError,errorMessages,userData} = validatePartialUser(req.body);
    if(hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }
    const userUpdated = await UserService.update(user, userData)
    return res.status(200).json(userUpdated);
});



export const deleteUser =catchAsync( async(req, res,next) => {
        const {user} = req;
        console.log(user);
        await  UserService.delete(user);
        return res.status(204).json();
});

