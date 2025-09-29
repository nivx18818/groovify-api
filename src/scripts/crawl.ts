import { sequelize, Track } from "@/models/index.ts";
import crawlSpotify from "@/utils/spotify-crawler.ts";
import { SpotifyAlbumUrl } from "@/types/spotify-types.ts";

const seedPlaylists: SpotifyAlbumUrl[] = [
  "https://open.spotify.com/album/6GpNEurteQ3B3x1gY1HD2z",
  "https://open.spotify.com/album/3nzuGtN3nXARvvecier4K0",
  "https://open.spotify.com/album/2yMfaynthtWVAkJ5A3Kwrf",
  "https://open.spotify.com/playlist/6E1pwaRtA8fXA9jvfeuKmu",
  "https://open.spotify.com/playlist/5r0mdLamHzeoCRh5g93WL5",
];

(async () => {
  await sequelize.authenticate();
  try {
    await crawlSpotify(seedPlaylists, 3);
  } catch (error) {
    console.error("Crawl error:", error);
  } finally {
    await sequelize.close();
  }
})();
