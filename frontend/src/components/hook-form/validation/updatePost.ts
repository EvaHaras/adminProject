import { z } from "zod";

export const validationUpdatePost = z.object({
    content: z.string().optional(),
    title: z.string().optional(),
    isAdminOnly:  z.number().optional(),
})


export type TValidationUpdatePost = z.infer<typeof validationUpdatePost>