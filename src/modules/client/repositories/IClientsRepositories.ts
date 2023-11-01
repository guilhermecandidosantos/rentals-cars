import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { Client } from "../entities/Client";

interface IClientsRepositories {
  create({
    name, email, driverLicense, validityDriverLicense, phone01,
    phone02, phone03, phone04, userIdCreated,
  }: ICreateClientDTO): Promise<void>
  findByClientId(clientId: string): Promise<Client>
  updateClient({
    id, name, email, driverLicense, validityDriverLicense, phone01,
    phone02, phone03, phone04, userIdUpdated,
  }: ICreateClientDTO): Promise<Client>
}

export { IClientsRepositories };
