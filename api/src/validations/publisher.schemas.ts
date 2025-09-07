import z from "zod";

export const publisherSchemas =  z.object({
    title:z.string().min(1)
})