// spotify.service.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

let accessToken = null;
let tokenExpires = 0;

// Get Spotify access token
async function getSpotifyToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpires) return accessToken;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    params.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`,
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpires = now + response.data.expires_in * 1000;
  return accessToken;
}

// Search for songs
export async function searchSongs(query) {
  const token = await getSpotifyToken();
  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.tracks.items;
}

export async function getSongById(id) {
  const token = await getSpotifyToken();

  const response = await axios.get(
    `https://api.spotify.com/v1/tracks/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}