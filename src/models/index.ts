import { Sequelize, DataTypes } from "sequelize";
import configData from "@/config/database.ts";
import trackModel from "./track.model.ts";

const env = process.env.NODE_ENV || "development";
const config = (configData as any)[env];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const Track = trackModel(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  Track,
};

export { sequelize, Sequelize, Track };
export default db;
