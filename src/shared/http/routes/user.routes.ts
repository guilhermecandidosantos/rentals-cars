import { AuthenticateUserController } from "@modules/account/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { RefreshTokenController } from "@modules/account/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

userRoutes.post("/create", ensureAuthenticated, ensureAdmin, createUserController.handle);

userRoutes.post("/authenticate", authenticateUserController.handle);

userRoutes.post("/refreshtoken", refreshTokenController.handle);

export { userRoutes };
