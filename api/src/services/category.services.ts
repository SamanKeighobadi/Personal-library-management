import { count, eq, and } from "drizzle-orm";
import { db } from "../db/migrate";
import { book, bookCategory, category } from "../db/schemas";
import { ICategory } from "../types/category.typs";

export const categoryServices = {
  getAllUserCategories: async (userID: number) => {
    return await db
      .select({
        id: category.id,
        title: category.title,
        userId: category.userId,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        bookCount: count(bookCategory.bookId).as("bookCount"),
      })
      .from(category)
      .leftJoin(bookCategory, eq(category.id, bookCategory.categoryId))
      .where(eq(category.userId, userID))
      .groupBy(category.id);
  },

  createUserCategory: async (body: Pick<ICategory, "title" | "userId">) => {
    return await db.insert(category).values(body).returning();
  },
  getUserCategoryByID: async (categoryID: number, userID: number) => {
    const categoryResult = await db
      .select({
        id: category.id,
        title: category.title,
        userId: category.userId,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      })
      .from(category)
      .where(and(eq(category.id, categoryID), eq(category.userId, userID)))
      .limit(1);

    if (!categoryResult[0]) {
      return null;
    }

    const books = await db
      .select({
        id: book.id,
        title: book.title,
      })
      .from(book)
      .innerJoin(bookCategory, eq(book.id, bookCategory.bookId))
      .where(eq(bookCategory.categoryId, categoryID));

    return {
      ...categoryResult[0],
      books,
    };
  },
};
