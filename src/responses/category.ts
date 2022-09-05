import { Category } from "../database/entities/category";

export type CategoryResponse = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  children?: any[];
  parent?: any;
};

export const transformToCategoryResponse = (
  input: Category
): CategoryResponse => {
  return {
    id: input.id,
    name: input.name,
    slug: input.slug,
    createdAt: input.created_at,
    updatedAt: input.updated_at,
    parent: input.parent && transformToCategoryResponse(input.parent),
    children:
      input.children &&
      input.children.map((x) => transformToCategoryResponse(x)),
  };
};
