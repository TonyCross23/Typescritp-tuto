import { Request, Response } from "express";
import prisma from "../../database/prisma";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { BadRequestException } from "../../exceptions/bad-request";

export const listAlUser = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    skip: +(req.query.skip ?? 0),
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      profile: true,
      role: true,
      defaultShippingAddress: true,
      defaultBillingAddress: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { id: +req.params.id },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
        role: true,
        defaultShippingAddress: true,
        defaultBillingAddress: true,
        createdAt: true,
        updatedAt: true,
        Address: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.NOT_FOUND);
  }
};

export const changeRole = async (req: Request, res: Response) => {
  try {
    const role = await prisma.user.update({
      where: { id: +req.params.id },
      data: {
        role: req.body.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
        role: true,
        defaultShippingAddress: true,
        defaultBillingAddress: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(role);
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.NOT_FOUND);
  }
};

export const userProfileUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get the file path of the uploaded file
    const filePath = `/upload/images/${req.file.filename}`;

    const userId = req.user?.id; // Or you can use req.params.id

    // Update the user's profile image in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profile: filePath },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};
