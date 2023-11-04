import { ICreateCategoryDto } from "@modules/car/dtos/ICreateCategoryDTO";
import { Category } from "@modules/car/entities/Category";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICategoriesRepository } from "../ICategoriesRepository";

@injectable()
class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient,
  ) {}

  async create({
    id, name, description, userIdCreated,
  }: ICreateCategoryDto): Promise<void> {
    await this.prisma.category.create({
      data: {
        id, name, description, userIdCreated,
      },
    });
  }

  async findById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { name } });

    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const carWithCategory = await this.prisma.car.findMany({ where: { categoryId: id } });

    if (carWithCategory.length > 0) {
      throw new AppError("Cannot delete category, category is use in a car");
    }

    await this.prisma.category.delete({ where: { id } });
  }
}

export { CategoriesRepository };
