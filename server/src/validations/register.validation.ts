import { z } from 'zod'

const registerSchema = z.object({
    email : z.string().email("Invalid email!"),
    password : z.string().min(6,"Minimum 6 character!").max(32,"Maximum 32 character!"),
    confirmPassword : z.string().min(6,"Minimum 6 character!").max(32,"Maximum 32 character!")
}).refine((data) => {
    return data.password === data.confirmPassword;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
    
export default registerSchema;