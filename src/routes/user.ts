import express from "express";
import { getUserService } from "../services/user";

const userRouter = express.Router();

userRouter.get("/:id", getUserService);

export default userRouter;
