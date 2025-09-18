import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      success(status?: number, data?: any): Response;
      error(
        status?: number,
        message?: string,
        details?: any,
        err?: Error
      ): Response;
    }
  }
}

const response = (_req: Request, res: Response, next: NextFunction) => {
  res.success = (status, data) => {
    if (status === 204) {
      return res.status(status).send();
    }

    return res.status(status ?? 200).json({
      data,
      error: null,
    });
  };

  res.error = (status, message, details, err) => {
    if (err && process.env.NODE_ENV === "development") {
      console.error(err);
    }

    const response = {
      data: null,
      error: {
        message: message ?? err?.toString(),
        details: details ?? null,
      },
    };

    return res.status(status ?? 500).json(response);
  };

  next();
};

export default response;
