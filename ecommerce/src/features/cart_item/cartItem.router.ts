import express, { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../error-handler";
import {
  addItemtoCart,
  changeQuantity,
  deleteItem,
  getCart,
} from "./cartItem.controller";

const cartRouter: Router = express.Router();

cartRouter.post("/", [authMiddleware], errorHandler(addItemtoCart));
cartRouter.delete("/:id", [authMiddleware], errorHandler(deleteItem));
cartRouter.put("/:id", [authMiddleware], errorHandler(changeQuantity));
cartRouter.get("/", [authMiddleware], errorHandler(getCart));

export default cartRouter;
