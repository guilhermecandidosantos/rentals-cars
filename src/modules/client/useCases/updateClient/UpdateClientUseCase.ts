import { ICreateClientDTO } from "@modules/client/dtos/ICreateClientDTO";
import { Client } from "@modules/client/entities/Client";
import { IClientsRepositories } from "@modules/client/repositories/IClientsRepositories";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateClientUseCase {
  constructor(
    @inject("ClientsRepositories")
    private clientsRepositories: IClientsRepositories,
  ) {}

  async execute({
    id, name, email, driverLicense, validityDriverLicense, phone01,
    phone02, phone03, phone04, userIdUpdated,
  }: ICreateClientDTO): Promise<Client> {
    let client = await this.clientsRepositories.findByClientId(id);

    if (!client) {
      throw new AppError("Client not found");
    }

    client = await this.clientsRepositories.updateClient({
      id,
      name,
      email,
      driverLicense,
      validityDriverLicense,
      phone01,
      phone02,
      phone03,
      phone04,
      userIdUpdated,
    });

    return client;
  }
}

export { UpdateClientUseCase };
