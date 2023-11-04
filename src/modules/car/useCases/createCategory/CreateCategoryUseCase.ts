import { ICreateCategoryDto } from "@modules/car/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description, userIdCreated }: ICreateCategoryDto): Promise<void> {
    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new AppError("Category already exists");
    }

    const id = v4();

    try {
      await this.categoriesRepository.create({
        id, name, description, userIdCreated,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { CreateCategoryUseCase };
