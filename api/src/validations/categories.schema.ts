import {z} from 'zod'

export const userCategorySchema = z.object({
    title:z.string().min(1).trim(),
    userId:z.number()
})