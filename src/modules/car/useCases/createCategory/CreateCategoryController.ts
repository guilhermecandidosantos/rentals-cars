import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = bodySchema.parse(request.body);
    const { id } = request.user;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    try {
      await createCategoryUseCase.execute({ name, description, userIdCreated: id });

      return response.status(201).json({ message: "Category created successfully" });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { CreateCategoryController };
