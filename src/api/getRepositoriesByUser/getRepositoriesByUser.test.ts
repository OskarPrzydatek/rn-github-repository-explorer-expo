import { octokit } from '../config';
import { getRepositoriesByUser } from './getRepositoriesByUser';

// Mock octokit configuration
jest.mock('@/api/config', () => ({
  octokit: {
    request: jest.fn(),
  },
}));

const mockUsername = 'mockUserName';

describe('getRepositoriesByUser', () => {
  it('should get repositories by user', async () => {
    const mockResponse = [
      {
        id: 1,
        name: 'repository-1',
        description: 'mockDescription',
        stargazers_count: 0,
      },
    ];

    (octokit.request as jest.Mock).mockResolvedValue(mockResponse);
    const result = await getRepositoriesByUser(mockUsername);

    expect(octokit.request).toHaveBeenCalledWith(
      'GET /users/{username}/repos',
      {
        username: mockUsername,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle API errors for get repositories by user', async () => {
    (octokit.request as jest.Mock).mockRejectedValue(
      new Error('Request failed'),
    );

    await expect(getRepositoriesByUser(mockUsername)).rejects.toThrow(
      'Request failed',
    );
  });
});
