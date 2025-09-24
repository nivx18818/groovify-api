import { SequelizeDataTypes } from "@/types/sequelize-data-types.ts";
import {
  SpotifyImage,
  TrackAudioPreview,
  TrackReleaseDate,
} from "@/types/spotify-types.ts";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class Track extends Model<
  InferAttributes<Track>,
  InferCreationAttributes<Track>
> {
  declare id: string;
  declare title: string;
  declare artists: string[];
  declare audioPreview: TrackAudioPreview;
  declare image: SpotifyImage[];
  declare releaseDate: TrackReleaseDate;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize, DataTypes: SequelizeDataTypes) => {
  Track.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artists: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      audioPreview: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: { url: "" },
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
        defaultValue: [],
      },
      releaseDate: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: { isoString: "" },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "tracks",
    }
  );
};
