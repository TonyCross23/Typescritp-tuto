import { errorHandler } from "../../error-handler";
import { Router } from "express";
import { createProduct, updateProduct } from "./product.controller";
import { authMiddleware } from "../../middlewares/auth";
import adminMiddleware from "../../middlewares/admin";

const productRouter: Router = Router();

productRouter.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);
productRouter.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct)
);

export default productRouter;
