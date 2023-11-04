import { EnumSN } from "enums";

interface ICreateUserDTO {
  id?: string
  name: string;
  username: string;
  email: string;
  password: string;
  admin?: EnumSN;
}

export { ICreateUserDTO };
