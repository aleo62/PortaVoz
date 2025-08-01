import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      uid: string;
      isAdmin: boolean;
      email: string;
    };
  }
}