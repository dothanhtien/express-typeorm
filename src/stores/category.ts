import { categoryTreeRepository } from "../database/repositories/category";
import { Category } from "../database/entities/category";

export const checkCategoryExistsById = async (id: number) => {
  const count = await categoryTreeRepository.countBy({ id });

  return count > 0;
};

export const checkCategoryExistsBySlug = async (slug: string) => {
  const count = await categoryTreeRepository.countBy({ slug });

  return count > 0;
};

export const createCategory = async (
  category: Category,
  parentCategory: Category | null
) => {
  const newCategory = categoryTreeRepository.create(category);

  if (parentCategory) {
    newCategory.parent = parentCategory;
  }

  return await categoryTreeRepository.save(newCategory);
};

export const getCategories = async () => {
  const categories = await categoryTreeRepository.findTrees();

  return categories;
};

export const getCategoryById = async (id: number) => {
  const category = await categoryTreeRepository.findOneBy({ id });

  return category;
};

export const updateCategoryById = async (id: number, category: any) => {
  const result = await categoryTreeRepository.update(id, category);

  return result;
};

export const deleteCategoryById = async (id: number | string) => {
  const result = await categoryTreeRepository.delete(id);

  return result;
};
