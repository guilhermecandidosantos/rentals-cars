import { ICreateClientDTO } from "@modules/client/dtos/ICreateClientDTO";
import { Client } from "@modules/client/entities/Client";
import { IClientsRepository } from "@modules/client/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
  private clientsRepository: IClientsRepository,
  ) {}

  async execute({
    name, email, driverLicense, validityDriverLicense, phone01,
    phone02, phone03, phone04, userIdCreated,
  }: ICreateClientDTO): Promise<void> {
    let client: Client;

    client = await this.clientsRepository.findByEmail(email);

    if ((client) && (client.email === email)) {
      throw new AppError("Email already registered");
    }

    client = await this.clientsRepository.findByDriverLicense(driverLicense);

    if ((client) && (client.driverLicense === driverLicense)) {
      throw new AppError("Driver License already registered");
    }

    const id = v4();

    try {
      await this.clientsRepository.create({
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
