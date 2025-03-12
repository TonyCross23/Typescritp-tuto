import { Request, Response } from "express";
import { AddressSchema, updateUserSchema } from "./address.validation";
import prisma from "../../database/prisma";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { Address } from "@prisma/client";
import { BadRequestException } from "../../exceptions/bad-request";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  const address = await prisma.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });
  res.status(200).json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prisma.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    throw new NotFoundException("Address not found", ErrorCode.NOT_FOUND);
  }
};

export const listAllAddress = async (req: Request, res: Response) => {
  const addresses = await prisma.address.findMany({
    where: { userId: req.user?.id },
  });
  res.status(200).json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validateData = updateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;

  if (validateData.defaultShippingAddress) {
    try {
      shippingAddress = await prisma.address.findFirstOrThrow({
        where: { id: validateData.defaultShippingAddress },
      });
    } catch (error) {
      throw new NotFoundException("Address not found", ErrorCode.NOT_FOUND);
    }
    if (shippingAddress.userId !== req.user?.id) {
      throw new BadRequestException(
        "Address does not belong to user",
        ErrorCode.BAD_REQUEST
      );
    }
  }
  if (validateData.defaultBillingAddress) {
    try {
      billingAddress = await prisma.address.findFirstOrThrow({
        where: { id: validateData.defaultBillingAddress },
      });
    } catch (error) {
      throw new NotFoundException("Address not found", ErrorCode.NOT_FOUND);
    }
    if (billingAddress.userId !== req.user?.id) {
      throw new BadRequestException(
        "Address does not belong to user",
        ErrorCode.BAD_REQUEST
      );
    }
  }

  const updateUser = await prisma.user.update({
    where: { id: req.user?.id },
    data: validateData,
  });
  res.status(200).json(updateUser);
};
