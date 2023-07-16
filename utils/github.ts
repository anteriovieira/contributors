import type { CacheOptions } from 'nitropack'
import type { FetchOptions } from 'ohmyfetch'

const runtimeConfig = useRuntimeConfig()

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
  return $fetch(url, {
    baseURL: 'https://api.github.com',
    headers: {
      'User-Agent': 'nitro',
      'Authorization': `Bearer ${runtimeConfig.GH_TOKEN}`,
      ...options?.headers,
    },
  })
}

export const ghRepoContributors = cachedFunction(async (repo: string, size = 100) => {
  const handler = async (page = 1) => {
    const contributors: any[] = []

    const data: any = await ghFetch(`/repos/${repo}/contributors?per_page=${size}&anon=true`)

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

