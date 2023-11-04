import { UsersRepository } from "@modules/account/repositories/implementations/UsersRepository";
import { UsersTokensRepository } from "@modules/account/repositories/implementations/UsersTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IClientsRepositories } from "@modules/client/repositories/IClientsRepositories";
import { ClientsRepositories } from "@modules/client/repositories/implementations/ClientsRepositories";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";
import "./provider/dateprovider";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/car/repositories/implementations/CategoriesRepository";

container.register<PrismaClient>("PrismaClient", { useValue: new PrismaClient() });

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton<IClientsRepositories>(
  "ClientsRepositories",
  ClientsRepositories,
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);
