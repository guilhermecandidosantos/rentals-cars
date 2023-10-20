import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/entities/User";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../IUserRepository";

@injectable()
class UserRepository implements IUserRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient,
  ) {}

  async create({
    id, name, username, email, password, admin,
  }: ICreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: {
        id, name, username, email, password, admin,
      },
    });
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    return user;
  }
}

export { UserRepository };
