import { ICreateClientDTO } from "@modules/client/dtos/ICreateClientDTO";
import { Client } from "@modules/client/entities/Client";
import { IClientsRepositories } from "@modules/client/repositories/IClientsRepositories";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateClientUseCase {
  constructor(
    @inject("ClientsRepositories")
  private clientsRepositories: IClientsRepositories,
  ) {}

  async execute({
    name, email, driverLicense, validityDriverLicense, phone01,
    phone02, phone03, phone04, userIdCreated,
  }: ICreateClientDTO): Promise<void> {
    let client: Client;

    client = await this.clientsRepositories.findByEmail(email);

    if ((client) && (client.email === email)) {
      throw new AppError("Email already registered");
    }

    client = await this.clientsRepositories.findByDriverLicense(driverLicense);

    if ((client) && (client.driverLicense === driverLicense)) {
      throw new AppError("Driver License already registered");
    }

    const id = v4();

    try {
      await this.clientsRepositories.create({
        id,
        name,
        email,
        driverLicense,
        validityDriverLicense,
        phone01,
        phone02,
        phone03,
        phone04,
        userIdCreated,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { CreateClientUseCase };
