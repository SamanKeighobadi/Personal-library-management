import { bookSchema } from './../validations/book.schema';
import { eq } from "drizzle-orm";
import { db } from "../db/migrate";
import { book } from "../db/schemas";
import { BookBody } from '../types/book.types';

export const bookServices = {
  getAllBooks: async () => {
    return await db.query.book.findMany({
      with: {
        author: {
          columns: {
            id: true,
            enName: true,
            faName: true,
            biography: true,
            image: true,
          },
        },
        publisher: {
          columns: {
            id: true,
            title: true,
          },
        },
        genre: {
          columns: {
            id: true,
            title: true,
          },
        },
      },
    });
  },
  getBookByID: async (bookID: number) => {
    return await db.query.book.findFirst({
      where: eq(book.id, bookID),
    });
  },
  createBook: async(body:BookBody) =>{
    return await db.insert(book).values(body).returning()
  }
};
