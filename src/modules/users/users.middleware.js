import { catchAsync } from "../../common/errors/catchAsync.js";
import { UserService } from "./users.service.js";

export const validateExistUser = catchAsync(async(req, res, next) => {
        const {id} = req.params;
        const user = await UserService.findOne(id);
        if(!user) {
            return res.status(404).json({
                status: 'error',
                message: `user with id: ${id} not found`
            });
        }
        req.user = user;
        console.log(user.name)
        next();
});