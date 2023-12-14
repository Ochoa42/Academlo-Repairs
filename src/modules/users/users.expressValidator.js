import { validateResult } from '../../common/utils/validateHelper.js';
import { check } from 'express-validator';


export const validateCreate = [
    check('name')
        .exists()
        .not()
        .isEmpty(),
    check('email')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isLength({min:8})
        .withMessage('Password must be at least 8 characters'),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

