
import { eq } from "drizzle-orm";
import { db } from "../db/migrate";
import { authors } from "../db/schemas";
import { CreateAuthorBody } from "../types/author.typs";

export const authorServices = {
  getAllAuthors: async () => {
    return await db.query.authors.findMany();
  },
  getAuthorByID: async (authorId: number) => {
    return await db.query.book.findFirst({
      where: eq(authors.id, authorId),
    });
  },
  createAuthor: async (body: CreateAuthorBody) => {
    const newAuthor = await db.insert(authors).values(body).returning();
    return newAuthor
  },
};
