import express, { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../error-handler";
import {
  addAddress,
  deleteAddress,
  listAllAddress,
  updateUser,
} from "./address.controller";

const addressRouter: Router = express.Router();

addressRouter.post("/", [authMiddleware], errorHandler(addAddress));
addressRouter.delete("/:id", [authMiddleware], errorHandler(deleteAddress));
addressRouter.get("/", [authMiddleware], errorHandler(listAllAddress));
addressRouter.put("/user", [authMiddleware], errorHandler(updateUser));

export default addressRouter;
