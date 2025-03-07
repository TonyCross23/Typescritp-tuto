import { errorHandler } from "../../error-handler";
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listAllProduct,
  updateProduct,
} from "./product.controller";
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
productRouter.get("/", [authMiddleware], errorHandler(listAllProduct));
productRouter.get("/:id", [authMiddleware], errorHandler(getProductById));
productRouter.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct)
);

export default productRouter;
