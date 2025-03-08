import express, { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../error-handler";
import {
  cancelOrder,
  createOrder,
  getOrderById,
  listOrder,
} from "./order.controller";

const orderRouter: Router = express.Router();

orderRouter.post("/", [authMiddleware], errorHandler(createOrder));
orderRouter.get("/", [authMiddleware], errorHandler(listOrder));
orderRouter.get("/:id", [authMiddleware], errorHandler(getOrderById));
orderRouter.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));

export default orderRouter;
