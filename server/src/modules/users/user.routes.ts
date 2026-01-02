import { Router } from "express";

import { createUser, getAuthUser } from "./user.controllers";
import { firebaseAuthMiddleware } from "../../middlewares/auth.middleware";

const usersRouter = Router();

usersRouter.post("/create", firebaseAuthMiddleware, createUser);
usersRouter.get("/me", firebaseAuthMiddleware, getAuthUser);

export { usersRouter };
