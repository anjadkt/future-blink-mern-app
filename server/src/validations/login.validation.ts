import { z } from 'zod'


const loginSchema = z.object({
    email : z.string().email("Invalid email!"),
    password : z.string().min(6,"Minimum 6 character!").max(32,"Maximum 32 character!")
});

export default loginSchema;