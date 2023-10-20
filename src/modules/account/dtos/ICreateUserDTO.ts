import { S_N } from "../enums/EnumS_N";

const adminType = S_N;

type TAdmin = keyof typeof adminType;

interface ICreateUserDTO {
  id?: string
  name: string;
  username: string;
  email: string;
  password: string;
  admin?: TAdmin;
}

export { ICreateUserDTO };
