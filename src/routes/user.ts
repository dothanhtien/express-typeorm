import express from "express";
import { getUserService, getUsersService } from "../services";

const userRouter = express.Router();

userRouter.get("/", getUsersService);
userRouter.get("/:id", getUserService);

export default userRouter;
