export interface TrackArtist {
  name: string;
  uri: string;
}

export interface TrackAudioPreview {
  url: string;
}

export interface SpotifyImage {
  url: string;
  maxHeight: number;
  maxWidth: number;
}

export interface TrackReleaseDate {
  isoString: string;
}

export interface TrackEntity {
  id: string;
  title: string;
  artists: TrackArtist[];
  audioPreview: TrackAudioPreview;
  image: SpotifyImage[];
  releaseDate: TrackReleaseDate;
}

export interface AlbumEntity {
  trackList: Array<{ uri: string }>;
}

export interface ArtistEntity {
  id: string;
  name: string;
  trackList: Array<{ uri: string }>;
  image: SpotifyImage[];
}

export interface NextData {
  props: {
    pageProps: {
      state: {
        data: {
          entity: TrackEntity | AlbumEntity | ArtistEntity;
        };
      };
    };
  };
}

export interface Track extends Omit<TrackEntity, "artists"> {
  artists: string[];
}

export type CrawlFunction = (id: string, d: number) => Promise<void>;

export type SpotifyAlbumUrl = `https://open.spotify.com/album/${string}`;
