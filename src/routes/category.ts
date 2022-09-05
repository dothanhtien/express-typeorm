import express from "express";
import { serviceWrapper } from "../utils/wrapper";
import {
  createCategoryService,
  getCategoriesService,
  getCategoryService,
  updateCategoryService,
} from "../services/category";
import { checkSchema } from "express-validator";
import { createCategorySchema } from "../utils/validations";
import { catchRequestError } from "../middlewares";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  [...checkSchema(createCategorySchema), catchRequestError],
  serviceWrapper(createCategoryService)
);

categoryRouter.get("/", serviceWrapper(getCategoriesService));

categoryRouter.get("/:id", serviceWrapper(getCategoryService));

categoryRouter.patch("/:id", serviceWrapper(updateCategoryService));

export default categoryRouter;
