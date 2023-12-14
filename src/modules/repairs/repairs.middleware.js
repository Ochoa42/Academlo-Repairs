import { RepairService } from "./repairs.service.js";

export const validateExistRepairs = async(req, res, next) => {
    try {
        const { id } = req.params;
        const repair = await RepairService.findOne(id);
        if(!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id: ${id} not found`
            });
        }

        req.repair = repair;
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail',
            message: 'something went very wrong',
            error,
        });
    }
}