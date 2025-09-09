import { bookStatusTypes } from "./global.typs";

export interface BookBody {
    title: string;
    description: string;
    image: string;
    authorId: number;
    genreId: number;
    publisherId: number;
    status: bookStatusTypes
}
