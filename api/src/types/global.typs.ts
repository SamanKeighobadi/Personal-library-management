export type USER_TYPE = "user" | "admin";

export type bookStatusTypes = "read" | "reading" | "unread";

export interface TIMESTAMP {
  createdAt: string | Date;
  updatedAt: string | Date;
}
