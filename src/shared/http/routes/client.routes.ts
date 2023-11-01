import { CreateClientController } from "@modules/client/useCases/createClient/CreateClientController";
import { Router } from "express";

const clientRoutes = Router();

const createClientController = new CreateClientController();

clientRoutes.post("/create", createClientController.handle);

export { clientRoutes };
