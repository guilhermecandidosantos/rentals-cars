import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { Client } from "@modules/client/entities/Client";
import { IClientsRepository } from "@modules/client/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListClientsByUserIdUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string): Promise<Client[]> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User isn't registered");
    }

    const clients = await this.clientsRepository.listByUserIdCreated(userId);

    return clients;
  }
}

export { ListClientsByUserIdUseCase };
