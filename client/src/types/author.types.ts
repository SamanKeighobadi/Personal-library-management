import type { ClientTimestamp } from "./global.types";

export interface AuthorTypes extends ClientTimestamp {
  id: number;
  faName: string;
  enName: string;
  biography: string;
  image: string;
}
