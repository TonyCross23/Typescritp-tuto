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

export const listAllProduct = async (req: Request, res: Response) => {
  //{
  //  count: 50,
  //  data: [],
  //}

  const count = await prisma.product.count();
  const products = await prisma.product.findMany({
    skip: +(req.query.skip ?? 0),
    take: 5,
  });
  res.status(200).json({
    count,
    date: products,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findFirstOrThrow({
      where: { id: +req.params.id },
    });
    res.status(200).json(product);
  } catch (error) {
    throw new NotFoundException("Product not fount", ErrorCode.NOT_FOUND);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({
      where: { id: +req.params.id },
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    throw new NotFoundException("Product not fount", ErrorCode.NOT_FOUND);
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        search: req.query.q?.toString(),
      },
      description: {
        search: req.query.q?.toString(),
      },
      tags: {
        search: req.query.q?.toString(),
      },
    },
  });
  res.status(200).json(products);
};
