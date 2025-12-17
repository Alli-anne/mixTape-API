import { jest } from '@jest/globals';

await jest.unstable_mockModule('axios', () => ({
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const axios = (await import('axios')).default;
const {
  searchSongs,
  getSongById,
} = await import('../spotify.service.js');

describe('spotify.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Set fake env vars for token request
    process.env.SPOTIFY_CLIENT_ID = 'test-client-id';
    process.env.SPOTIFY_CLIENT_SECRET = 'test-client-secret';
  });

  describe('searchSongs', () => {
    test('returns track items from Spotify search', async () => {
      // Mock token request
      axios.post.mockResolvedValue({
        data: {
          access_token: 'fake-token',
          expires_in: 3600,
        },
      });

      // Mock search request
      axios.get.mockResolvedValue({
        data: {
          tracks: {
            items: [{ id: '1', name: 'Song A' }],
          },
        },
      });

      const result = await searchSongs('test song');

      // Assertions
      expect(axios.post).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('Basic'),
          }),
        })
      );

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/v1/search'),
        {
          headers: { Authorization: 'Bearer fake-token' },
        }
      );

      expect(result).toEqual([{ id: '1', name: 'Song A' }]);
    });
  });

  describe('getSongById', () => {
    test('returns song data by id', async () => {
      axios.post.mockResolvedValue({
        data: {
          access_token: 'fake-token',
          expires_in: 3600,
        },
      });

      axios.get.mockResolvedValue({
        data: { id: '123', name: 'My Song' },
      });

      const result = await getSongById('123');

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/tracks/123',
        {
          headers: { Authorization: 'Bearer fake-token' },
        }
      );

      expect(result).toEqual({ id: '123', name: 'My Song' });
    });
  });
});
