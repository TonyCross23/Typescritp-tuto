import express, { Router } from "express";
import { me, signin, signUp } from "./auth.controller";
import { errorHandler } from "../../error-handler";
import { authMiddleware } from "../../middlewares/auth";

const authRouter: Router = express.Router();

authRouter.post("/signup", errorHandler(signUp));
authRouter.post("/signin", errorHandler(signin));
authRouter.get("/me", [authMiddleware], errorHandler(me));

export default authRouter;
