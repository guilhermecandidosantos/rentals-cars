import { S_N } from "../enums/EnumS_N";

const adminType = S_N;

type TAdmin = keyof typeof adminType;
class User {
  id: string;
  name: string;
  email: string;
  password: string;
  admin?: TAdmin;
  createdAt?: Date;
  updatedAt?: Date;
}

export { User };
