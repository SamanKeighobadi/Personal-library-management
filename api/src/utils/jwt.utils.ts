import { sign, SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateToken = (payload: TokenPayload, options: SignOptions) => {
  return sign(payload, JWT_SECRET, options);
};
