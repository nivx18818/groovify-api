const fs = require("fs");
const path = require("path");
const express = require("express");
const { Op } = require("sequelize");
const models = require("@/models");

const mainRouter = express.Router();
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-9) === ".route.js")
  .forEach((file) => {
    const { subRouter, include } = require(path.join(__dirname, file));
    const resource = file.split(".")[0]; // E.g. post.route.js -> post
    const modelName = resource[0].toUpperCase() + resource.slice(1); // E.g. post -> Post
    const model = models[modelName];

    subRouter.param("id", async (req, res, next, id) => {
      const options = {
        where: { [Op.or]: [{ id }] },
      };
      if (include) options.include = include;

      const value = await model.findOne(options);
      if (!value) return res.error(404, `${modelName} not found`);
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

module.exports = mainRouter;
