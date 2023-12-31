import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";

import { DateProvider } from "@shared/container/provider/dateprovider/implementation/DateProvider";

import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const clientSchema = z.object({
      name: z.string(),
      email: z.string(),
      driverLicense: z.string(),
      validityDriverLicense: z.string(),
      phone01: z.string(),
      phone02: z.string(),
      phone03: z.string(),
      phone04: z.string(),
    });

    const { id } = request.user;

    try {
      clientSchema.parse(request.body);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }

    const {
      name, email, driverLicense, validityDriverLicense, phone01,
      phone02, phone03, phone04,
    } = clientSchema.parse(request.body);

    const dateProvider = new DateProvider();

    const newValidityDriverLicense = dateProvider.returnDate(validityDriverLicense);

    let createClientUseCase: CreateClientUseCase;

    try {
      createClientUseCase = container.resolve(CreateClientUseCase);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }

    try {
      await createClientUseCase.execute({
        name,
        email,
        driverLicense,
        validityDriverLicense: newValidityDriverLicense,
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
