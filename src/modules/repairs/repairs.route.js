import express from 'express';
import { createRepair, deleteRepair, findAllRepairs, findOneRepair, updateRepair } from './repairs.controller.js';
import { validateExistRepairs } from './repairs.middleware.js';
import { validateCreate } from './repairs.expressValidator.js';



export const router = express.Router();

router.post('/create',validateCreate,createRepair);
router.get('/',findAllRepairs);

router
  .route('/:id')
  .get(validateExistRepairs,findOneRepair)
  .patch(validateExistRepairs,updateRepair)
  .delete(validateExistRepairs,deleteRepair)