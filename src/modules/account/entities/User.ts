import { S_N } from "../../../enums";

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
