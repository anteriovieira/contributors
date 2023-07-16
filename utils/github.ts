import type { CacheOptions } from 'nitropack'
import type { FetchOptions } from 'ohmyfetch'

const commonCacheOptions: CacheOptions = {
  group: "gh",
  swr: true,
  maxAge: 60 * 60 * 6, // 6 hours
  staleMaxAge: 60 * 60 * 12, // 12 hours
}

const cacheOptions = (name: string) => ({
  ...commonCacheOptions, name,
})

export const ghFetch = async (url: string, options: FetchOptions = {}) => {
  const token = await globalThis.Github?.get('GH_TOKEN') || process.env.GH_TOKEN

  return $fetch(url, {
    baseURL: 'https://api.github.com',
    headers: {
      'User-Agent': 'nitro',
      'Authorization': `Bearer ${token}`,
      ...options?.headers,
    },
  })
}

export const ghRepoContributors = cachedFunction(async (repo: string) => {
  const handler = async (page = 1, size= 100) => {
    const contributors: any[] = []

    const data: any = await ghFetch(`/repos/${repo}/contributors?per_page=${size}&anon=true&page=${page}`)

    contributors.push(...data.map((d) => ({
      id: d.id,
      username: d.login,
      contributions: d.contributions,
    })))

    if (data.length === size) {
      contributors.push(...(await handler(page + 1)))
    }

    return contributors.filter(
      contributor => ![ 'dependabot[bot]', 'dependabot-preview[bot]' ]
        .includes(contributor.username)
    )
  }

  return handler()
}, cacheOptions('contributors'))

