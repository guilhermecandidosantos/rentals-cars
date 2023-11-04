import { ICreateClientDTO } from "@modules/client/dtos/ICreateClientDTO";
import { Client } from "@modules/client/entities/Client";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IClientsRepository } from "../IClientsRepository";

@injectable()
class ClientsRepository implements IClientsRepository {
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

  async findByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { email } });

    return client;
  }

  async findByDriverLicense(driverLicense: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { driverLicense } });

    return client;
  }

  async listByUserIdCreated(userId: string): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({ where: { userIdCreated: userId } });

    return clients;
  }

  async listAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany();

    return clients;
  }
}

export { ClientsRepository };
