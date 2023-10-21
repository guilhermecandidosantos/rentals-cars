import { UsersRepository } from "@modules/account/repositories/implementations/UsersRepository";
import { UsersTokensRepository } from "@modules/account/repositories/implementations/UsersTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

container.register<PrismaClient>("PrismaClient", { useValue: new PrismaClient() });

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository,
);
