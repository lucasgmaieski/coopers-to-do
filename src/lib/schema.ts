import { object, z } from "zod"

const phoneRegex = new RegExp(
  /^\d{10,11}$/
);
 
export const signInSchema = object({
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string()
  .min(6, 'Password must be at least 6 characters long')
  .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(4, 'The name must be at least 4 characters long'),
})

export const contactSchema = object({
  name: z.string().min(4, 'The name must be at least 6 characters long').optional(),
  email: z.string().email({message: 'Invalid email address'}),
  phone: z.string().regex(phoneRegex, 'The phone number must have between 10 and 11 digits'),
  message: z.string()
  .min(10, 'The message must be at least 10 characters long')
});

