import { Router } from "express";
import authRouter from "../features/auth/auth.router";
import productRouter from "../features/products/product.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);

export default router;
