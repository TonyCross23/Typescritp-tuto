import prisma from "../../database/prisma";
import { Request, Response } from "express";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";

export const createProduct = async (req: Request, res: Response) => {
  //["tea", "hehe"] => "tea,hehe"

  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  res.status(200).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(",");
    }
    const updateProduct = await prisma.product.update({
      where: { id: +req.params.id },
      data: product,
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    throw new NotFoundException("Product not fount", ErrorCode.NOT_FOUND);
  }
};
