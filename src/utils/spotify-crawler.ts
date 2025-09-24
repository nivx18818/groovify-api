import {
  AlbumEntity,
  ArtistEntity,
  CrawlFunction,
  NextData,
  SpotifyAlbumUrl,
  TrackType,
  TrackEntity,
} from "@/types/spotify-types.ts";
import puppeteer from "puppeteer";

const visitedPlaylists = new Set<string>();
const visitedArtists = new Set<string>();
const visitedTracks = new Set<string>();

const crawlSpotify = async (
  seedPlaylists: SpotifyAlbumUrl[],
  depth = 3
): Promise<TrackType[]> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results: TrackType[] = [];
  const SPOTIFY_EMBED_ORIGIN = "https://open.spotify.com/embed";

  const crawlTrack: CrawlFunction = async (id, d) => {
    if (d <= 0 || visitedTracks.has(id)) return;
    visitedTracks.add(id);

    await page.goto(`${SPOTIFY_EMBED_ORIGIN}/track/${id}`, {
      waitUntil: "networkidle2",
    });

    const data = await page.$eval("#__NEXT_DATA__", (el) => {
      const pageData = el.textContent;
      return JSON.parse(pageData) as NextData;
    });

    const entity = data?.props?.pageProps?.state?.data?.entity as TrackEntity;

    results.push({
      id: entity.id,
      title: entity.title,
      artists: entity.artists.map((a) => a.name),
      audioPreview: entity.audioPreview,
      image: entity.image,
      releaseDate: entity.releaseDate,
    });

    for (const artist of entity.artists) {
      const artistId = artist.uri.split(":").at(-1) ?? "";
      await crawlArtist(artistId, d - 1);
    }
  };

  const crawlArtist: CrawlFunction = async (id, d) => {
    if (d <= 0 || visitedArtists.has(id)) return;
    visitedArtists.add(id);

    await page.goto(`${SPOTIFY_EMBED_ORIGIN}/artist/${id}`, {
      waitUntil: "networkidle2",
    });

    const data = await page.$eval("#__NEXT_DATA__", (el) => {
      const pageData = el.textContent;
      return JSON.parse(pageData) as NextData;
    });

    const entity = data?.props?.pageProps?.state?.data?.entity as ArtistEntity;
    const trackList = entity?.trackList ?? [];

    for (const track of trackList) {
      const trackId = track?.uri?.split(":").at(-1) ?? "";
      await crawlTrack(trackId, d - 1);
    }
  };

  const crawlPlaylist: CrawlFunction = async (id, d) => {
    if (d <= 0 || visitedPlaylists.has(id)) return;
    visitedPlaylists.add(id);

    await page.goto(`${SPOTIFY_EMBED_ORIGIN}/album/${id}`, {
      waitUntil: "networkidle2",
    });

    const data = await page.$eval("#__NEXT_DATA__", (el) => {
      const pageData = el.textContent;
      return JSON.parse(pageData) as NextData;
    });

    const entity = data?.props?.pageProps?.state?.data?.entity as AlbumEntity;
    const trackList = entity?.trackList ?? [];

    for (const track of trackList) {
      const trackId = track?.uri?.split(":").at(-1) ?? "";
      await crawlTrack(trackId, d - 1);
    }
  };

  for (const url of seedPlaylists) {
    const playlistId = url.split("/").at(-1) ?? "";
    await crawlPlaylist(playlistId, depth);
  }

  await browser.close();
  return results;
};

export default crawlSpotify;
