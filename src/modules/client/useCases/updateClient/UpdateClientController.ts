import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";

import { DateProvider } from "@shared/container/provider/dateprovider/implementation/DateProvider";

import { UpdateClientUseCase } from "./UpdateClientUseCase";

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const clientSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      driverLicense: z.string(),
      validityDriverLicense: z.string(),
      phone01: z.string(),
      phone02: z.string(),
      phone03: z.string(),
      phone04: z.string(),
    });

    const { id: userId } = request.user;

    try {
      clientSchema.parse(request.body);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }

    const {
      id, name, email, driverLicense, validityDriverLicense, phone01,
      phone02, phone03, phone04,
    } = clientSchema.parse(request.body);

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    const dateProvider = container.resolve(DateProvider);

    const newValidityDriverLicense = dateProvider.returnDate(validityDriverLicense);

    try {
      const updatedClient = await updateClientUseCase.execute({
        id,
        name,
        email,
        driverLicense,
        validityDriverLicense: newValidityDriverLicense,
        phone01,
        phone02,
        phone03,
        phone04,
        userIdUpdated: userId,
      });

      return response.status(200).json(updatedClient);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { UpdateClientController };
