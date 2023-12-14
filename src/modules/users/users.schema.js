import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';


const registerSchema = z.object({
        name: z
        .string({
         invalid_type_error: 'name must be a string',
         required_error: 'name is required',              
        })
        .min(3,{message: 'name is too short'})
        .max(50,{message: 'name is too long'}),

        email: z
        .string()
        .email({ message: 'Invalid email'}),

        password: z
        .string()
        .min(8,{message: 'Password must be at least 8 characters'})
        .max(16,{message: 'Password is too long'}),
        
        role: z.enum(['client','employee',]),

        status: z.enum(['available','disabled'])
});

export function validateUser(data){
    const result = registerSchema.safeParse(data);
 
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
 
 export function validatePartialUser(data){
      const result = registerSchema.partial().safeParse(data);
   
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