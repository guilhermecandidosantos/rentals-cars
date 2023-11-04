import { CreateClientController } from "@modules/client/useCases/createClient/CreateClientController";
import { ListAllClientsController } from "@modules/client/useCases/listAllClients/ListAllClientsController";
import { ListClientsByUserIdController } from "@modules/client/useCases/listClientsByUserId/ListClientsByUserIdController";
import { UpdateClientController } from "@modules/client/useCases/updateClient/UpdateClientController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/http/middlewares/ensureAuthenticated";

const clientRoutes = Router();

const createClientController = new CreateClientController();
const updateClientController = new UpdateClientController();
const listAllClientsController = new ListAllClientsController();
const listClientsByUserIdController = new ListClientsByUserIdController();

clientRoutes.use(ensureAuthenticated);

clientRoutes.get("/listbyuser", listClientsByUserIdController.handle);
clientRoutes.get("/listall", listAllClientsController.handle);
clientRoutes.post("/create", createClientController.handle);
clientRoutes.put("/update", updateClientController.handle);

export { clientRoutes };
