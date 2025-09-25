import { NextFunction, Request, Response } from "express";

type AsyncFunction = (req: Request, res: Response) => Promise<any>;

const asyncHandler =
  (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
  };

export default asyncHandler;
