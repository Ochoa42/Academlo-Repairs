import { validateResult } from '../../common/utils/validateHelper.js';
import { check } from 'express-validator';


export const validateCreate = [
    check('date')
        .exists()
        .not()
        .isEmpty(),
    check('motorsNumber')
        .exists()
        .isNumeric(),
    check('description')
        .exists()
        .not()
        .isEmpty(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]