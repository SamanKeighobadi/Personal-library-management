import { USER_TYPE } from "./global.typs";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: USER_TYPE;
}
