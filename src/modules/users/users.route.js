import express from 'express';
import { deleteUser, findAllUsers, findOneUser, updateUser, register } from './users.controller.js';

import { validateExistUser } from './users.middleware.js';
import { validateCreate } from './users.expressValidator.js';

export const router = express.Router();

router.post('/register',validateCreate,register); 
router.get('/',findAllUsers);


router
  .route('/:id')
  .get(validateExistUser,findOneUser)
  .patch(validateExistUser,updateUser)
  .delete(validateExistUser,deleteUser);


  