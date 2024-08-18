import axios from 'axios';

import { getUsersByQuery } from '@/api/getUsersByQuery/getUsersByQuery';

jest.mock('axios');

const BASE_URL = 'https://api.github.com';
const AUTH_TOKEN = 'fake-auth-token';
const USERS_PER_PAGE = '5';

const mockUsersData = {
  items: [
    { id: 1, login: 'johnDoe' },
    { id: 2, login: 'johnSmith' },
  ],
};

describe('getUsersByQuery', () => {
  it('should return users data when API call is successful', async () => {
    const mockQuery = 'john';

    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsersData });

    const result = await getUsersByQuery(mockQuery);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/search/users?q=${mockQuery}&per_page=${USERS_PER_PAGE}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    expect(result).toEqual(mockUsersData);
  });

  it('should return an empty array when API call returns no data', async () => {
    const mockQuery = 'nonexistentuser';

    (axios.get as jest.Mock).mockResolvedValue({ data: undefined });

    const result = await getUsersByQuery(mockQuery);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/search/users?q=${mockQuery}&per_page=${USERS_PER_PAGE}`,
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
    const mockQuery = 'erroruser';

    (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(getUsersByQuery(mockQuery)).rejects.toThrow('API Error');
  });
});
