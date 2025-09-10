import type { AuthorTypes } from "./author.types";
import type { ClientTimestamp } from "./global.types";
import type { PublisherTypes } from "./publisher.types";

export type bookStatusTypes = "read" | "reading" | "unread";

export interface IBookResponse extends ClientTimestamp {
  id: number;
  title: string;
  status: bookStatusTypes;
  description: string;
  publisher: PublisherTypes;
  author: AuthorTypes;
  genre: GenreTypes;
  image: string;
}

export interface GenreTypes extends ClientTimestamp {
  id: number;
  title: string;
}
