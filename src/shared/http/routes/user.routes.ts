import { AuthenticateUserController } from "@modules/account/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post("/create", ensureAuthenticated, ensureAdmin, createUserController.handle);

userRoutes.post("/authenticate", authenticateUserController.handle);

export { userRoutes };
