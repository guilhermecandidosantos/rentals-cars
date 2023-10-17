import { TAdmin } from "../types/TAdmin";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  admin?: TAdmin;
}

export { ICreateUserDTO };
