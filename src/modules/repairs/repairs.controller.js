import { RepairService } from "./repairs.service.js"
import { validateRepairs, validatePartialRepairs } from "./repairs.schema.js";
import { catchAsync } from "../../common/errors/catchAsync.js";

export const findAllRepairs = catchAsync( async(req, res, next) => {
    const repairs = await RepairService.findAll();
    return res.status(200).json(repairs)
});


export const createRepair = catchAsync( async(req, res, next) => {
   
  const { hasError , errorMessages , repairData} = validateRepairs(req.body); // aquie no se necesita desestructurar por que zod ya lo hace internam
      
      if(hasError) {
          return res.status(422).json({
              status: 'error',
              message: errorMessages,
          });
      }
      const repairs = await RepairService.create(repairData)
      return res.status(201).json(repairs)
});



export const findOneRepair = catchAsync( async(req, res,next) => {

    const { id } = req.params;
    const repair = await RepairService.findOne(id);
    if(!repair){
      return res.status(404).json({
        status: 'error',
        message: 'repair not found'
      })
    }
    return res.status(200).json(repair)
});



export const updateRepair =catchAsync( async(req, res, next) => {
    const { id } = req.params;
    const repair = await RepairService.findOne(id);
    if(!repair){
      return res.status(404).json({
        status: 'error',
        message: 'repair not found'
      })
    }
    const repairUpdated = await RepairService.update(repair)
    return res.status(200).json(repairUpdated)
});



export const deleteRepair = catchAsync( async(req, res) => {
    const { id } = req.params;
    const repair = await RepairService.findOne(id, ['pending', 'completed']);
    if(repair?.status === 'completed'){
      return res.status(400).json({
        status: 'error',
        message: 'the repair has been already completed'
      })
    }
    if(!repair){
      return res.status(404).json({
        status: 'error',
        message: 'repair not found'
      })
    }
    await RepairService.delete(repair)
    return res.status(204).json(null)
});
