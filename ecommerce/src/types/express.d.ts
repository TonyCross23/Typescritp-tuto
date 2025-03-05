import { User } from "@prisma/client";
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: User; // `user` is optional to prevent errors when it's missing
  }
}
