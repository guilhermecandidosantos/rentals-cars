import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";

import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const clientSchema = z.object({
      name: z.string(),
      email: z.string(),
      driverLicense: z.string(),
      validityDriverLicense: z.date(),
      phone01: z.string(),
      phone02: z.string(),
      phone03: z.string(),
      phone04: z.string(),
    });

    const { id } = request.user;

    const {
      name, email, driverLicense, validityDriverLicense, phone01,
      phone02, phone03, phone04,
    } = clientSchema.parse(request.body);

    const createClientUseCase = container.resolve(CreateClientUseCase);

    try {
      await createClientUseCase.execute({
        name,
        email,
        driverLicense,
        validityDriverLicense,
        phone01,
        phone02,
        phone03,
        phone04,
        userIdCreated: id,
      });

      return response.status(201).json({ message: "Client created successfully" });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { CreateClientController };
