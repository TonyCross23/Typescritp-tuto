import express, { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../error-handler";
import {
  cancelOrder,
  changeStatus,
  createOrder,
  getOrderById,
  listAllOrders,
  listOrder,
} from "./order.controller";
import adminMiddleware from "../../middlewares/admin";

const orderRouter: Router = express.Router();

orderRouter.get(
  "/index",
  [authMiddleware, adminMiddleware],
  errorHandler(listAllOrders)
);
orderRouter.post("/", [authMiddleware], errorHandler(createOrder));
orderRouter.get("/", [authMiddleware], errorHandler(listOrder));
orderRouter.get("/:id", [authMiddleware], errorHandler(getOrderById));
orderRouter.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));
orderRouter.put(
  "/:id/status",
  [authMiddleware, adminMiddleware],
  errorHandler(changeStatus)
);

export default orderRouter;
