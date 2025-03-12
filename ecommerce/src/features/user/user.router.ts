import express, { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import adminMiddleware from "../../middlewares/admin";
import { errorHandler } from "../../error-handler";
import {
  changeRole,
  getUserById,
  listAlUser,
  userProfileUpload,
} from "./user.controller";
import upload from "../../utils/upload";

const userRouter: Router = express.Router();

userRouter.put(
  "/",
  [authMiddleware],
  upload.single("profile"),
  errorHandler(userProfileUpload)
);

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
