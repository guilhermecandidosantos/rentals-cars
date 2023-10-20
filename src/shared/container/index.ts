import { UserRepository } from "@modules/account/repositories/implementations/UserRepository";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

container.register<PrismaClient>("PrismaClient", { useValue: new PrismaClient() });

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository,
);
