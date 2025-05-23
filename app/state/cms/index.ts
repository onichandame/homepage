import { cache } from "../cache";
import { getGithubSDK } from "../github";

if (!process.env.ARTICLE_REPO) {
  throw new Error(`ARTICLE_REPO is not defined`)
}

if (!process.env.ARTICLE_BRANCH) {
  throw new Error(`ARTICLE_BRANCH is not defined`)
}

const [username, reponame] = process.env.ARTICLE_REPO.split(`/`)

/**
 * depends on `github` `cache` `process.env.ARTICLE_REPO` `process.env.ARTICLE_BRANCH`
 */
export async function getFileContent(paths: string[],) {
  const expressions = paths.map(path => `${process.env.ARTICLE_BRANCH}:${path}`)
  const cachedFiles = await cache.mget(expressions)
  const nonCachedFilesExpressions = cachedFiles.reduce<string[]>((acc, val, ind) => {
    if (!val) {
      acc.push(expressions[ind])
    }
    return acc
  }, [])
  if (nonCachedFilesExpressions.length) {
    const githubSdk = await getGithubSDK()
    const innerQuery = nonCachedFilesExpressions.reduce((prev, curr, ind) => {
      return prev + `file${ind}: object(expression: "${curr}") { ... on Blob { text } }`
    }, '')
    const res = await githubSdk.graphql<{ repository: { [filekey: string]: { text: string, } } }>(`query getArticle($username:String!, $reponame:String!) {
  repository(owner: $username, name: $reponame) {
    ${innerQuery}
  }
  }`, { username, reponame })
    await cache.mset(nonCachedFilesExpressions.map((expression, ind) => ({ key: expression, value: res.repository[`file${ind}`]?.text })))
  }
  return cache.mget<string>(expressions)
}

/**
 * depends on `github` `process.env.ARTICLE_REPO` `process.env.ARTICLE_BRANCH`
 * @param path 
 */
export async function listEntries(path: string) {
  const githubSdk = await getGithubSDK()
  const res = await githubSdk.graphql<{ repository: { object: { entries: { name: string, type: string }[] } } }>(`query listEntries($username:String!, $reponame:String!, $expression:String!) {
    repository(owner: $username, name: $reponame) {
      object(expression: $expression) {
        ... on Tree {
          entries{
            name
            type
          }
        }
      }
    }
  }`, { username, reponame, expression: `${process.env.ARTICLE_BRANCH}:${path}` })
  return res.repository.object.entries
}
