import { Router } from "express";

import { carRoutes } from "./car.routes";
import { clientRoutes } from "./client.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/client", clientRoutes);
routes.use("/car", carRoutes);

export { routes };
