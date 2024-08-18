import axios from 'axios';

import { getRepositoriesByUser } from '@/api/getRepositoriesByUser/getRepositoriesByUser';

jest.mock('axios');

const BASE_URL = 'https://api.github.com';
const AUTH_TOKEN = 'fake-auth-token';

const mockUsername = 'exampleUser';
const mockRepositopriesData = [
  { id: 1, name: 'repo1', description: 'description', stargaze_count: 0 },
  { id: 2, name: 'repo2', description: 'description', stargaze_count: 0 },
];

describe('getRepositoriesByUser', () => {
  it('should return repositories data when API call is successful', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockRepositopriesData });

    const result = await getRepositoriesByUser(mockUsername);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/users/${mockUsername}/repos`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    expect(result).toEqual(mockRepositopriesData);
  });

  it('should return an empty array when API call returns no data', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: undefined });

    const result = await getRepositoriesByUser(mockUsername);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/users/${mockUsername}/repos`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    expect(result).toEqual([]);
  });

  it('should handle API errors by throwing an exception', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(getRepositoriesByUser(mockUsername)).rejects.toThrow(
      'API Error',
    );
  });
});
