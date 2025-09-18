import { sequelize } from "@/models";
import { NextFunction, Request, Response } from "express";

const sequelizeAuthenticate = async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    next();
  }
};

export default sequelizeAuthenticate;
