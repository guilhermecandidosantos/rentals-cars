import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllClientsUseCase } from "./ListAllClientsUseCase";

class ListAllClientsController {
  async handle(request: Request, response: Response) : Promise<Response> {
    try {
      const listAllClientsUseCase = container.resolve(ListAllClientsUseCase);

      const clients = await listAllClientsUseCase.execute();

      return response.status(200).json(clients);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { ListAllClientsController };
