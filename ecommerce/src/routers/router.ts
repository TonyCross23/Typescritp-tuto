import { Router } from "express";
import authRouter from "../features/auth/auth.router";
import productRouter from "../features/products/product.router";
import addressRouter from "../features/address/address.router";
import cartRouter from "../features/cart_item/cartItem.router";
import orderRouter from "../features/order/order.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/address", addressRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);

export default router;
