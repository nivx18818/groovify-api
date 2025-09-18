import { Request, Response, NextFunction } from "express";

const handleError = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  (res as any).error(500, error.toString(), null, error);
};

export default handleError;
