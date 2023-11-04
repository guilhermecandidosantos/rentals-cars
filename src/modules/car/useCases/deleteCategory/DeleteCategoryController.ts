import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { id } = request.params;

    try {
      const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);
      await deleteCategoryUseCase.execute(id);

      return response.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { DeleteCategoryController };
