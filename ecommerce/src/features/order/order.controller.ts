import { Request, Response } from "express";
import prisma from "../../database/prisma";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";

export const createOrder = async (req: Request, res: Response) => {
  return await prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: req.user?.id,
      },
      include: {
        product: true,
      },
    });
    if (cartItems.length == 0) {
      return res.status(404).json({ message: "cart is empty" });
    }
    const price = cartItems.reduce((prev, current) => {
      return prev + current.quantity * +current.product.price;
    }, 0);

    const address = await tx.address.findFirst({
      where: { id: req.user?.defaultShippingAddress ?? undefined },
    });

    const order = await tx.order.create({
      data: {
        user: {
          connect: { id: req.user?.id },
        },
        netAmount: price,
        address: address?.formattedAddress ?? "default address",
        OrderProduct: {
          create: cartItems.map((cart) => {
            return {
              productId: cart.productId,
              quantity: cart.quantity,
            };
          }),
        },
      },
    });

    const orderEvent = await tx.orderEvent.create({
      data: {
        orderId: order.id,
      },
    });
    await tx.cartItem.deleteMany({
      where: {
        userId: req.user?.id,
      },
    });
    res.status(200).json(order);
  });
};

export const listOrder = async (req: Request, res: Response) => {
  const order = await prisma.order.findMany({
    where: { userId: req.user?.id },
    include: {
      OrderProduct: true,
      OrderEvent: true,
    },
  });
  res.status(200).json(order);
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const ordrer = await prisma.order.findFirstOrThrow({
      where: { id: +req.params.id },
    });
    res.status(200).json(ordrer);
  } catch (error) {
    throw new NotFoundException("Order not found", ErrorCode.NOT_FOUND);
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.update({
      where: { id: +req.params.id },
      data: {
        status: "CANCELLED",
      },
    });
    await prisma.orderEvent.create({
      data: {
        orderId: order.id,
        status: "CANCELLED",
      },
    });
    res.status(200).json(order);
  } catch (error) {
    throw new NotFoundException("Order not found", ErrorCode.NOT_FOUND);
  }
};
