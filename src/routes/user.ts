import express from "express";
import { checkSchema } from "express-validator";
import { catchRequestError } from "../middlewares";
import {
  createUserService,
  getUserService,
  getUsersService,
} from "../services";
import { createUserSchema } from "../utils/validations";
import { serviceWrapper } from "../utils/wrapper";

const userRouter = express.Router();

userRouter.post(
  "/",
  [...checkSchema(createUserSchema), catchRequestError],
  serviceWrapper(createUserService)
);
userRouter.get("/", serviceWrapper(getUsersService));
userRouter.get("/:id", serviceWrapper(getUserService));

export default userRouter;
