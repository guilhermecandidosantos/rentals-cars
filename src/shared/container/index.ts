import { UsersRepository } from "@modules/account/repositories/implementations/UsersRepository";
import { UsersTokensRepository } from "@modules/account/repositories/implementations/UsersTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/car/repositories/implementations/CategoriesRepository";
import { IClientsRepository } from "@modules/client/repositories/IClientsRepository";
import { ClientsRepository } from "@modules/client/repositories/implementations/ClientsRepository";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";
import "./provider/dateprovider";

container.register<PrismaClient>("PrismaClient", { useValue: new PrismaClient() });

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository,
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);
