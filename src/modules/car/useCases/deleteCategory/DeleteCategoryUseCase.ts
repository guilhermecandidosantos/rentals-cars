import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      await this.categoriesRepository.deleteCategory(id);
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { DeleteCategoryUseCase };
