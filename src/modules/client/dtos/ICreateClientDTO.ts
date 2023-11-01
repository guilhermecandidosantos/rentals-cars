interface ICreateClientDTO {
  id?: string
  name: string;
  email: string;
  driverLicense: string;
  validityDriverLicense: Date;
  phone01: string;
  phone02: string;
  phone03: string;
  phone04: string;
  userIdCreated?: string;
  userIdUpdated?: string;
}

export { ICreateClientDTO };
