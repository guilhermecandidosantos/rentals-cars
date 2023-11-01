import { ICreateClientDTO } from "@modules/client/dtos/ICreateClientDTO";
import { Client } from "@modules/client/entities/Client";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IClientsRepositories } from "../IClientsRepositories";

@injectable()
class ClientsRepositories implements IClientsRepositories {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient,
  ) {}
  async create({
    id, name, email, driverLicense, validityDriverLicense,
    phone01, phone02, phone03, phone04, userIdCreated,
  }: ICreateClientDTO): Promise<void> {
    await this.prisma.client.create({
      data: {
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
      },
    });
  }

  async findByClientId(clientId: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });

    return client;
  }

  async updateClient({
    id, name, email, driverLicense, validityDriverLicense,
    phone01, phone02, phone03, phone04, userIdUpdated,
  }: ICreateClientDTO): Promise<Client> {
    const client = await this.prisma.client.update({
      data: {
        name,
        email,
        driverLicense,
        validityDriverLicense,
        phone01,
        phone02,
        phone03,
        phone04,
        userIdUpdated,
      },
      where: { id },
    });

    return client;
  }
}

export { ClientsRepositories };
