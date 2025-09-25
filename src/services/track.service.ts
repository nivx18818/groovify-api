import { Track } from "@/models/index.ts";
import { TrackType } from "@/types/spotify-types.ts";

type Id = TrackType["id"];
type OptionalTrackType = Partial<TrackType>;

export const getAll = async () => {
  const tracks = await Track.findAll();
  return tracks;
};

export const getById = async (id: Id) => {
  const track = await Track.findOne({
    where: { id },
  });
  return track;
};

exports.create = async (data: TrackType) => {
  const newComment = await Track.create(data);
  const track = getById(newComment.id);
  return track;
};

exports.update = async (id: Id, data: OptionalTrackType) => {
  const updatedRows = await Track.update(data, {
    where: { id },
  });

  if (!updatedRows) return null;

  const updatedComment = await getById(id);
  return updatedComment;
};

exports.delete = async (id: Id) => {
  const deletedRows = await Track.destroy({ where: { id } });
  return deletedRows > 0;
};
