import { z } from "zod";

export const validationDataSignIn = z.object({
    jks: z.string().min(1, {message: "Це поле обов'язкове" }),
    email: z.string().email({message:'Не вірний формат електронної пошти'}),
    password: z.string().min(3, {message:"Це поле обов'язкове"}),
    rememberMe: z.boolean()
})

export type TValidationDataSingIn = z.infer<typeof validationDataSignIn>