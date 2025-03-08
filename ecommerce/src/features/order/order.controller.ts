import { CartItem } from "./../../../node_modules/.pnpm/@prisma+client@6.4.1_prisma@6.4.1_typescript@5.8.2__typescript@5.8.2/node_modules/.prisma/client/index.d";
import { Request, Response } from "express";
import prisma from "../../database/prisma";

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
