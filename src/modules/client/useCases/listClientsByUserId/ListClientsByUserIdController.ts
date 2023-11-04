import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListClientsByUserIdUseCase } from "./ListClientsByUserIdUseCase";

class ListClientsByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    try {
      const listClientsByUserIdUseCase = container.resolve(ListClientsByUserIdUseCase);

      const clients = await listClientsByUserIdUseCase.execute(id);

      return response.status(200).json(clients);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { ListClientsByUserIdController };
