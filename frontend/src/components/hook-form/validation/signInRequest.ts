import { z } from "zod";

export const validationDataSignIn = z.object({
    email: z.string().email({message:'Не вірний формат електронної пошти'}),
    password: z.string().min(3, {message:"Це поле обов'язкове"}),
})

export const validationDataLogin = z.object({
    username: z.string().min(3, {message:"Це поле обов'язкове"}),
    email: z.string().email({message:'Не вірний формат електронної пошти'}),
    password: z.string().min(3, {message:"Це поле обов'язкове"}),
    admin: z.boolean()
})

export const validateForgotPassword = z.object({
    email: z.string().email()
})

export type TValidationDataSingIn = z.infer<typeof validationDataSignIn>
export type TValidationDataLogin = z.infer<typeof validationDataLogin>
export type TValidationForgotPassword = z.infer<typeof validateForgotPassword>