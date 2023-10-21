interface IUserTokenDTO {
  id: string;
  userId: string;
  refreshToken: string;
  expiresDate: Date
}

export { IUserTokenDTO };
