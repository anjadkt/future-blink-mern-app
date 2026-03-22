import { z } from 'zod'

export const baseSchema = z.object({
  email : z
  .string()
  .email("Enter a valid email!"),
  password : z
  .string()
  .min(6,"Min 6 character")
  .max(32, "cannot exceed 32 characters")
})

export const registerSchema = baseSchema.extend({
  confirmPassword : z
  .string()
  .min(6,"Min 6 character")
  .max(32, "cannot exceed 32 characters")
})
.refine((data) => {
  return data.confirmPassword === data.password
},{
  message : "Password do not match!",
  path : ["confirmPassword"]
});

