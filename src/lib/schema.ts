import { object, string, z } from "zod"
 
export const signInSchema = object({
  email: z.string().email({message: 'Endereço de email inválido'}),
  password: z.string()
  .min(6, 'A senha deve ter pelo menos 6 caracteres')
  .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(6, 'O nome deve ter pelo menos 6 caracteres'),
})