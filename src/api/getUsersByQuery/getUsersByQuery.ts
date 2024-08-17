import axios from 'axios';

/**
 *
 * @description - Function to get list of GitHub users which logins
 * contains the search query. Max limit of users is 5.
 *
 * @param {string} q - A query containing the user's name
 * to search their GitHub repositories
 *
 * @returns First page of users searching result page
 *
 * @documentation - https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-users
 *
 */
export const getUsersByQuery = async (q: string) => {
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const AUTH_TOKEN = process.env.EXPO_PUBLIC_AUTH_TOKEN;
  const USERS_PER_PAGE = process.env.EXPO_PUBLIC_USERS_PER_PAGE;

  const response = await axios.get(
    `${BASE_URL}/search/users?q=${q}&per_page=${USERS_PER_PAGE}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  return response.data || [];
};
