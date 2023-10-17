import { v4 as uuidId } from "uuid";

import { TAdmin } from "../types/TAdmin";

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  admin: TAdmin;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidId();
    }
  }
}

export { User };
