import express, { Router } from "express";
import { signin, signUp } from "./auth.controller";

const authRouter: Router = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signin);

export default authRouter;
