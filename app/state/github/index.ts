import { Octokit } from "octokit"

let githubSdk: Octokit | null = null

/**
 * depends on `process.env.GITHUB_TOKEN`
 */
export async function getGithubSDK() {
  if (githubSdk) {
    return githubSdk
  } else {
    githubSdk = new Octokit({ auth: process.env.GITHUB_TOKEN })
    return githubSdk
  }
}
