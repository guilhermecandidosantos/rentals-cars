import { CreateCategoryController } from "@modules/car/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "@modules/car/useCases/deleteCategory/DeleteCategoryController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRoutes = Router();

const createCategoryController = new CreateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

carRoutes.post("/category/create", ensureAuthenticated, createCategoryController.handle);
carRoutes.delete("/category/:id/delete", ensureAuthenticated, deleteCategoryController.handle);

export { carRoutes };
