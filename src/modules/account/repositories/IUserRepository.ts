import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
  create({
    name, email, password, admin,
  }: ICreateUserDTO): Promise<void>
  findUserById(id: string): Promise<User>
  findUserByEmail(email: string): Promise<User>
  findUserByUsername(username: string): Promise<User>
}

export { IUserRepository };
