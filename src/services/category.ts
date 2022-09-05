import { Request } from "express";
import { transformToCategoryResponse } from "../responses";
import {
  checkCategoryExistsBySlug,
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from "../stores";
import { BadRequestException, NotFoundException } from "../utils/exceptions";
import { convertToSlug } from "../utils/helpers";

export const createCategoryService = async (req: Request) => {
  const { name, parentId } = req.body;

  const slug = convertToSlug(name);

  const isExist = await checkCategoryExistsBySlug(slug);
  if (isExist) {
    throw new BadRequestException("Slug already exists");
  }

  let parentCategory = null;
  if (parentId) {
    parentCategory = await getCategoryById(parentId);
    if (!parentCategory) {
      throw new BadRequestException("Parent category does not exist");
    }
  }

  const category = await createCategory({ ...req.body, slug }, parentCategory);

  return { statusCode: 201, category: transformToCategoryResponse(category) };
};

export const getCategoriesService = async (req: Request) => {
  const categories = await getCategories();

  return { categories: categories.map((x) => transformToCategoryResponse(x)) };
};

export const getCategoryService = async (req: Request) => {
  const { id } = req.params;

  const category = await getCategoryById(+id);
  if (!category) {
    throw new NotFoundException("Category does not exist");
  }

  return { category: transformToCategoryResponse(category) };
};

export const updateCategoryService = async (req: Request) => {
  const { id } = req.params;
  const { name, slug, parentId } = req.body;

  const input: any = { name, slug };

  if (parentId) {
    const parentCategory = await getCategoryById(Number(parentId));
    if (!parentCategory) {
      throw new BadRequestException("Parent category does not exist");
    }
    input.parent = parentCategory;
  }

  await updateCategoryById(Number(id), input);

  return { result: true };
};

export const deleteCategoryService = async (req: Request) => {
  const { id } = req.params;

  await deleteCategoryById(id);

  return { result: true };
};
