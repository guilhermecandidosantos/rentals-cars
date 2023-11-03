import { CreateClientController } from "@modules/client/useCases/createClient/CreateClientController";
import { UpdateClientController } from "@modules/client/useCases/updateClient/UpdateClientController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/http/middlewares/ensureAuthenticated";

const clientRoutes = Router();

const createClientController = new CreateClientController();
const updateClientController = new UpdateClientController();

clientRoutes.post("/create", ensureAuthenticated, createClientController.handle);
clientRoutes.put("/update", ensureAuthenticated, updateClientController.handle);

export { clientRoutes };
