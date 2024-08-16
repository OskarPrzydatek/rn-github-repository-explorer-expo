import { octokit } from '@/api/config';

/**
 *
 * @description - Function to get list of all GitHub repositorise
 * for selected user by his github login/username
 *
 * @param {string} username - GitHub username/login value
 *
 * @returns Selected user repositories
 *
 * @documentation - https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user
 *
 */
export const getRepositoriesByUser = async (username: string) =>
  await octokit.request('GET /users/{username}/repos', {
    username,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
