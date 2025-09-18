import fs from "fs";
import path from "path";
import express from "express";
import { Op } from "sequelize";
import models from "@/models/index.js";

const mainRouter = express.Router();
const basename = path.basename(import.meta.url);

fs.readdirSync(path.dirname(import.meta.url.replace("file://", "")))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-9) === ".route.js")
  .forEach(async (file) => {
    const { subRouter, include } = await import(path.join(path.dirname(import.meta.url.replace("file://", "")), file));
    const resource = file.split(".")[0]; // E.g. post.route.js -> post
    const modelName = resource[0].toUpperCase() + resource.slice(1); // E.g. post -> Post
    const model = models[modelName];

    subRouter.param("id", async (req: any, res: any, next: any, id: any) => {
      const options: any = {
        where: { [Op.or]: [{ id }] },
      };
      if (include) options.include = include;

      const value = await model.findOne(options);
      if (!value) return (res as any).error(404, `${modelName} not found`);
      req[modelName.toLowerCase()] = value;

      next();
    });

    const pathname = (() => {
      switch (resource) {
        default:
          return `/${resource}s`;
      }
    })();

    mainRouter.use(pathname, subRouter);
  });

export default mainRouter;