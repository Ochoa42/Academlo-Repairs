import { RepairService } from "./repairs.service.js"
import { validateRepairs, validatePartialRepairs } from "./repairs.schema.js";

export const findAllRepairs = async(req, res) => {
  try {
    const repairs = await RepairService.findAll();

    return res.status(200).json(repairs)
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨'
    })
  }
}

export const createRepair = async(req, res) => {
  try {
    const { hasError , errorMessages , repairData} = validateRepairs(req.body); // aquie no se necesita desestructurar por que zod ya lo hace internam
      
      if(hasError) {
          return res.status(422).json({
              status: 'error',
              message: errorMessages,
          });
      }

      const repairs = await RepairService.create(repairData)
      return res.status(201).json(repairs)

  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨'
    })
  }
}

export const findOneRepair = async(req, res) => {
  try {
    const { id } = req.params;

    const repair = await RepairService.findOne(id);

    if(!repair){
      return res.status(404).json({
        status: 'error',
        message: 'repair not found'
      })
    }

    return res.status(200).json(repair)

  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨'
    })
  }
}

export const updateRepair = async(req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨'
    })
  }
}

export const deleteRepair = async(req, res) => {
  try {
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
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
      error
    })
  }
}
