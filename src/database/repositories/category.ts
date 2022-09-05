import { appDataSource } from "../app-data-source";
import { Category } from "../entities/category";

export const categoryTreeRepository = appDataSource.getTreeRepository(Category);
