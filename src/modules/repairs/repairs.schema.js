import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';


const createSchema = z.object({
    date: z
    .date({
      invalid_type_error: 'date must be a valid date',
      required_error: 'date is required',
    })
    .refine((value) => !isNaN(value.getTime()), {
      message: 'Invalid date',
    }),

  motorsNumber: z
    .number({
      invalid_type_error: 'motorsNumber must be a number',
      required_error: 'motorsNumber is required',
    })
    .int()
    .positive({ message: 'motorsNumber must be a positive integer' }),

  description: z
    .string({
      invalid_type_error: 'description must be a string',
      required_error: 'description is required',
    })
    .min(1, { message: 'description is too short' })
    .max(255, { message: 'description is too long' }),

  status: z.enum(['pending', 'completed', 'cancelled']),

  userId: z
    .number({
      invalid_type_error: 'userId must be a number',
      required_error: 'userId is required',
    })
    .int()
    .positive({ message: 'userId must be a positive integer' }),
});

export function validateRepairs(data){
    const result = createSchema.safeParse(data);
 
    const {
         hasError,
         errorMessages,
         data: userData,
    } = extractValidationData(result);
 
    return {
         hasError,
         errorMessages,
         userData,
    };
 }
 

 //  esta validacion es exclusivamente para los datos de usuario
 
 export function validatePartialRepairs(data){
      const result = createSchema.partial().safeParse(data);
   
      const {
           hasError,
           errorMessages,
           data: userData,
      } = extractValidationData(result);
   
      return {
           hasError,
           errorMessages,
           userData,
      };
   }