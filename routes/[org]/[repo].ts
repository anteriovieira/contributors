import { ghRepoContributors } from "../../utils/github"

export default eventHandler(async (event) => {
  const { org, repo } = event.context.params

  const contributors: any[] = await ghRepoContributors(`${org}/${repo}`)

  return contributors
})

