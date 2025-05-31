import { z } from "zod";

export const validationUpdateUser = z.object({
    username: z.string().optional(),
    email: z.string().email({message:'Не вірний формат електронної пошти'}).optional(),
    role: z.string().optional(),
})


export type TValidationUpdateUser = z.infer<typeof validationUpdateUser>