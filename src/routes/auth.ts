import express from "express";
import { checkSchema } from "express-validator";
import { catchRequestError } from "../middlewares";
import { authenticate } from "../middlewares/auth";
import {
  getMyInfoService,
  refreshTokenService,
  signInService,
  signUpService,
} from "../services";
import { signUpSchema } from "../utils/validations";
import { serviceWrapper } from "../utils/wrapper";

const authRouter = express.Router();

authRouter.post(
  "/sign-up",
  [...checkSchema(signUpSchema), catchRequestError],
  serviceWrapper(signUpService)
);

authRouter.post("/sign-in", serviceWrapper(signInService));

authRouter.get("/my-info", authenticate, serviceWrapper(getMyInfoService));

authRouter.post("/refresh-token", serviceWrapper(refreshTokenService));

export default authRouter;
