import { Router } from "express";

import { clientRoutes } from "./client.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/client", clientRoutes);

export { routes };
