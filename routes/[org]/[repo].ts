import { cachedGHContributors } from "../../utils/github"

export default eventHandler(async (event) => {
  const { org, repo } = event.context.params

  const contributors: any[] = await cachedGHContributors(`${org}/${repo}`)

  return contributors
})
