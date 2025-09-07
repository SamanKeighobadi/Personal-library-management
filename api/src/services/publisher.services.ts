import { eq } from "drizzle-orm";
import { db } from "../db/migrate";
import { publisher } from "../db/schemas";
import { IPublisher } from "../types/publisher.types";

export const publisherServices = {
  getAllPublishers: async () => {
    return await db.query.publisher.findMany();
  },
  getPublisherByID: async (publisherID: number) => {
    return await db.query.publisher.findMany({
      where: eq(publisher.id, publisherID),
    });
  },
  createPublisher: async (body: Pick<IPublisher, "title">) => {
    return await db.insert(publisher).values(body).returning();
  },
};
