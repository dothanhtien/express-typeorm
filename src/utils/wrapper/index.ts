import { NextFunction, Request, Response } from "express";

export const serviceWrapper =
  (service: (req: Request) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service(req);

      const statusCode = result.statusCode || 200;

      delete result.statusCode;

      res.status(statusCode).json({
        status: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
