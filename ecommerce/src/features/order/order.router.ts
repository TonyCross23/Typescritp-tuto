import express, { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../error-handler";
import { createOrder } from "./order.controller";

const orderRouter: Router = express.Router();

orderRouter.post("/", [authMiddleware], errorHandler(createOrder));

export default orderRouter;
