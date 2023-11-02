import { CreateClientController } from "@modules/client/useCases/createClient/CreateClientController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/http/middlewares/ensureAuthenticated";

const clientRoutes = Router();

const createClientController = new CreateClientController();

clientRoutes.post("/create", ensureAuthenticated, createClientController.handle);

export { clientRoutes };
