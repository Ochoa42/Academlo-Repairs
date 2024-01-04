import { UserService } from "./users.service.js"
import { validateUser, validatePartialUser } from "./users.schema.js"
import { catchAsync } from "../../common/errors/catchAsync.js";

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUser(req.body); // aquie no se necesita desestructurar por que zod ya lo hace internam
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const user = await UserService.create(userData)
  if (!user) {
    return res.status(404).json({
      status: 'Error',
      message: `email: ${email} already exists in the database`
    })
  }
  return res.status(201).json(user)
});




export const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserService.findAll()
  return res.status(200).json(users)
});

export const findOneUser = catchAsync(async (req, res) => {
  const { user } = req;

  return res.status(200).json({
    id: user.id,
    password: user.password,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hasError, errorMessages, userData } = validatePartialUser(req.body);
  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
  }
  const userUpdated = await UserService.update(user, userData)
  return res.status(200).json(userUpdated);
});



export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  console.log(user);
  await UserService.delete(user);
  return res.status(204).json();
});

