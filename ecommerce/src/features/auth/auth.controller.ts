import { NextFunction, Request, Response } from "express";
import prisma from "../../database/prisma";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secrets";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { UnprocessableEntity } from "../../exceptions/validation";
import { signupSchema } from "./auth.vaidation";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signupSchema.parse(req.body);
  const { name, email, password, profile } = req.body;
  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    next(
      new BadRequestException("User already exists", ErrorCode.ALREADY_EXISTS)
    );
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
  try {
    let user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new Error("User does not exists");
    }
    if (!compareSync(password, user.password)) {
      throw new Error("Incorrect email or password");
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
