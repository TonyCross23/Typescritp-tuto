import express, { Router } from "express";
import { signin, signUp } from "./auth.controller";
import { errorHandler } from "../../error-handler";

const authRouter: Router = express.Router();

authRouter.post("/signup", errorHandler(signUp));
authRouter.post("/signin", errorHandler(signin));

export default authRouter;
