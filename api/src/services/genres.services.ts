import { eq } from "drizzle-orm";
import { db } from "../db/migrate";
import { genres } from "../db/schemas";

export const genresServices = {
  getAllGenres: async () => {
    return await db.query.genres.findMany();
  },
  getGenreByID: async (genreId: number) => {
    return await db.query.genres.findFirst({
      where: eq(genres.id, genreId),
    });
  },
  createGenre: async (body:{title:string}) =>{
    return await db.insert(genres).values(body).returning()
  },
  deleteGenre: async (genreId:number) => {
    return await db.delete(genres).where(eq(genres.id,genreId)).returning()
  }
};
