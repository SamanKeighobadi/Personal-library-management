import type { ClientTimestamp } from "./global.types";

export interface PublisherTypes extends ClientTimestamp {
  id: number;
  title: string;
}
