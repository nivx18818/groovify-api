import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express, { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import db from "@/models/index.js";

interface CustomRequest extends Request {
  [key: string]: any;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const mainRouter = express.Router();

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-9) === ".route.js"
  )
  .forEach(async (file) => {
    const { subRouter, include } = await import(
      path.join(path.dirname(import.meta.url.replace("file://", "")), file)
    );
    const resource = file.split(".")[0]; // E.g. post.route.js -> post
    const modelName = resource[0].toUpperCase() + resource.slice(1); // E.g. post -> Post
    const model = db[modelName];

    subRouter.param(
      "id",
      async (req: Request, res: Response, next: NextFunction, id: any) => {
        const options: any = {
          where: { [Op.or]: [{ id }] },
        };
        if (include) options.include = include;

        const value = await model.findOne(options);
        if (!value) return res.error(404, `${modelName} not found`);
        (req as CustomRequest)[modelName.toLowerCase()] = value;

        next();
      }
    );

    const pathname = (() => {
      switch (resource) {
        default:
          return `/${resource}s`;
      }
    })();

    mainRouter.use(pathname, subRouter);
  });

export default mainRouter;
