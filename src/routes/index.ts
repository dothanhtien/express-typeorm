import express from "express";
import authRouter from "./auth";
import categoryRouter from "./category";
import userRouter from "./user";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/categories", categoryRouter);

export default rootRouter;
