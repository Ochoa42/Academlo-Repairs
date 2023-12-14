import { UserService } from "./users.service.js"
import { validateUser, validatePartialUser } from "./users.schema.js"

export const register = async(req,res) => {
  try {
      
      const { hasError , errorMessages , userData} = validateUser(req.body); // aquie no se necesita desestructurar por que zod ya lo hace internam
      
      if(hasError) {
          return res.status(422).json({
              status: 'error',
              message: errorMessages,
          });
      }

      const user = await UserService.create(userData)
      return res.status(201).json(user)

  } catch (error) {
      console.log(error)
      return res.status(500).json({
          status: 'fail',
          message: 'something went very wrong',
          error,
      });
  }
}


export const findAllUsers = async(req, res) => {
  try {
    const users = await UserService.findAll()

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨'
    })
  }
}

export const createUser = async(req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await UserService.create({ name, email, password, role })

    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨'
    })
  }
}

export const findOneUser = async(req, res) => {
  try {
    const { id } = req.params;

    const user = await UserService.findOne(id);

    if(!user){
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      })
    }

    return res.status(200).json(user)
    
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨'
    })
  }
}

export const updateUser = async(req, res) => {
  try {
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
} catch (error) {
    console.log(error)
    return res.status(404).json({
        status: 'fail',
        message: 'something went very wrong',
        error,
    });
}
}

export const deleteUser = async(req, res) => {
  try {
        const {user} = req;
        console.log(user);
        await  UserService.delete(user);
        return res.status(204).json();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
      error,
    })
  }
}

