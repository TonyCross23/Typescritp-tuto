import { NextFunction, Request, Response } from "express";
import prisma from "../../database/prisma";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secrets";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { UnprocessableEntity } from "../../exceptions/validation";
import { signupSchema } from "./auth.vaidation";
import { NotFoundException } from "../../exceptions/not-found";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signupSchema.parse(req.body);
  const { name, email, password, profile } = req.body;
  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    new BadRequestException("User already exists", ErrorCode.ALREADY_EXISTS);
  }
  user = await prisma.user.create({
    data: {
      name,
      email,
      profile: profile || null,
      password: hashSync(password, 10),
    },
  });
  res.status(200).json(user);
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    throw new NotFoundException("User does not exists", ErrorCode.NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestException(
      "Incorrect email or password",
      ErrorCode.BAD_REQUEST
    );
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const me = async (req: Request, res: Response) => {
  res.json(req.user);
};
