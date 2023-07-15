export const cachedGHContributors = cachedFunction(async (target: string) => {
  const data: any = await $fetch(`https://api.github.com/repos/${target}/contributors`)

  return data
}, {
  maxAge: 60 * 60,
  name: 'ghContributors',
  getKey: (target: string) => target
})
