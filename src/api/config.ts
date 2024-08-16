import { Octokit } from 'octokit';

const auth = process.env.AUTH_TOKEN;

export const octokit = new Octokit({ auth });
