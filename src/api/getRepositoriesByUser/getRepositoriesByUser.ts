import axios from 'axios';

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
export const getRepositoriesByUser = async (username: string) => {
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const AUTH_TOKEN = process.env.EXPO_PUBLIC_AUTH_TOKEN;

  const response = await axios.get(`${BASE_URL}/users/${username}/repos`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return response.data || [];
};
