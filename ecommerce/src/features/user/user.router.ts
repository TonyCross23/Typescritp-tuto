import express, { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import adminMiddleware from "../../middlewares/admin";
import { errorHandler } from "../../error-handler";
import { changeRole, getUserById, listAlUser } from "./user.controller";

const userRouter: Router = express.Router();

userRouter.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(listAlUser)
);
userRouter.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getUserById)
);
userRouter.put(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(changeRole)
);

export default userRouter;
