import { IUserTokenDTO } from "../dtos/IUserTokenDTO";
import { UserToken } from "../entities/UserToken";

interface IUsersTokensRepository {
  create({
    id, userId, refreshToken, expiresDate,
  }:IUserTokenDTO): Promise<void>
  findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
