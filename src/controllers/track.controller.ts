import { Track } from "@/models/index.ts";
import { trackService } from "@/services/index.ts";
import asyncHandler from "@/utils/async-handler.ts";
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      track?: typeof Track;
    }
  }
}

export const getAll = asyncHandler(async (_req, res) => {
  const tracks = await trackService.getAll();
  return res.success(200, tracks);
});

export const getById = (req: Request, res: Response) =>
  res.success(200, req.track);
