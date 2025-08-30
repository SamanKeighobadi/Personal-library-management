import {z} from 'zod'

export const genresSchema = z.object({
    title:z.string().min(1).max(255).trim()
})