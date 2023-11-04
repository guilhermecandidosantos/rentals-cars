import { ICreateCategoryDto } from "../dtos/ICreateCategoryDTO";
import { Category } from "../entities/Category";

interface ICategoriesRepository {
  create({
    id, name, description, userIdCreated,
  }: ICreateCategoryDto): Promise<void>
  findById(id: string): Promise<Category>
  findByName(name: string): Promise<Category>
  deleteCategory(id: string): Promise<void>
}

export { ICategoriesRepository };
