import { Client } from "@modules/client/entities/Client";
import { IClientsRepository } from "@modules/client/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllClientsUseCase {
  constructor(
    @inject("ClientsRepositories")
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(): Promise<Client[]> {
    try {
      const clients = await this.clientsRepository.listAll();

      return clients;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { ListAllClientsUseCase };
