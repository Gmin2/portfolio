const SPOTIFY_API_BASE = "https://spotify.cody.bio";

interface LastTrackImage {
  size: string;
  "#text": string;
}

interface LastTrack {
  name: string;
  artist: { name: string };
  image: LastTrackImage[];
}

interface SpotifyStatusResponse {
  lastTrack: LastTrack | null;
}

export async function fetchSpotifyStatus(): Promise<SpotifyStatusResponse> {
  const res = await fetch(`${SPOTIFY_API_BASE}/v1/status`);
  return res.json() as Promise<SpotifyStatusResponse>;
}
