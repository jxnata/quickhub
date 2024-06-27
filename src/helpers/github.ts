import { Octokit } from '@octokit/rest';

export const getOctokit = (token: string) => {
    return new Octokit({
        auth: token,
    });
};
