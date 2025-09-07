import {z} from 'zod'

export const bookSchema =  z.object({
    title:z.string().min(1).max(255),
    description:z.string().min(1),
    image:z.string().min(1).max(255),
    authorId:z.number().int().positive(),
    genreId:z.number().int().positive(),
    publisherId:z.number().int().positive(),
    status:z.enum(["read",'reading','unread'])
})