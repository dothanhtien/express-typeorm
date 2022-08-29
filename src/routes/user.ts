import express from "express";
import {
  createUserService,
  getUserService,
  getUsersService,
} from "../services";

const userRouter = express.Router();

userRouter.post("/", createUserService);
userRouter.get("/", getUsersService);
userRouter.get("/:id", getUserService);

export default userRouter;
