// TODO: Add noew test for axios
// import { getUsersByQuery } from './getUsersByQuery';

// // Mock octokit configuration
// jest.mock('@/api/config', () => ({
//   octokit: {
//     request: jest.fn(),
//   },
// }));

// const mockQuery = 'mockQuery';

// describe('getUsersByQuery', () => {
//   it('should get users by query', async () => {
//     const mockResponse = {
//       total_count: 1,
//       incomplete_results: false,
//       items: [
//         {
//           login: 'mockQueryUser',
//           id: 1,
//           type: 'User',
//           site_admin: false,
//           score: 1.0,
//         },
//       ],
//     };

//     (octokit.request as jest.Mock).mockResolvedValue(mockResponse);
//     const result = await getUsersByQuery(mockQuery);

//     expect(octokit.request).toHaveBeenCalledWith('GET /search/users', {
//       q: mockQuery,
//       per_page: 5,
//       headers: {
//         'X-GitHub-Api-Version': '2022-11-28',
//       },
//     });
//     expect(result).toEqual(mockResponse);
//   });

//   it('should handle API errors for get users by qyery', async () => {
//     (octokit.request as jest.Mock).mockRejectedValue(
//       new Error('Request failed'),
//     );

//     await expect(getUsersByQuery(mockQuery)).rejects.toThrow('Request failed');
//   });
// });
