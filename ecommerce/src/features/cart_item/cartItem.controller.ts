import { Request, Response } from "express";
import {
  changeQuantitySchema,
  createCartItemSchema,
} from "./cartItem.validation";
import { Product } from "@prisma/client";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import prisma from "../../database/prisma";

export const addItemtoCart = async (req: Request, res: Response) => {
  const validateData = createCartItemSchema.parse(req.body);
  let product: Product;

  try {
    product = await prisma.product.findFirstOrThrow({
      where: {
        id: validateData.productId,
      },
    });
  } catch (error) {
    throw new NotFoundException("Product not found ", ErrorCode.NOT_FOUND);
  }
  const cart = await prisma.cartItem.create({
    data: {
      userId: req.user?.id!,
      productId: product.id,
      quantity: validateData.quantity,
    },
  });
  res.status(200).json(cart);
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    await prisma.cartItem.delete({
      where: { id: +req.params.id },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    throw new NotFoundException("Item not found", ErrorCode.NOT_FOUND);
  }
};

export const changeQuantity = async (req: Request, res: Response) => {
  const validateData = changeQuantitySchema.parse(req.body);
  try {
    const updateItem = await prisma.cartItem.update({
      where: { id: +req.params.id },
      data: {
        quantity: validateData.quantity,
      },
    });
    res.status(200).json(updateItem);
  } catch (error) {
    throw new NotFoundException("Item not found", ErrorCode.NOT_FOUND);
  }
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prisma.cartItem.findMany({
    where: { userId: req.user?.id },
    include: {
      product: true,
    },
  });
  res.status(200).json(cart);
};
